import { axiosWithAuth } from './axiosInstance';

function pemEncode(buffer: ArrayBuffer, label: string): string {
  const base64 = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const formatted = base64.match(/.{1,64}/g)?.join('\n') ?? base64;
  return `-----BEGIN ${label}-----\n${formatted}\n-----END ${label}-----`;
}

export async function generateAndStoreRSAKeyPair(userId: string) {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );

  const publicKeyBuffer = await window.crypto.subtle.exportKey(
    'spki',
    keyPair.publicKey
  );
  const publicKeyPEM = pemEncode(publicKeyBuffer, 'PUBLIC KEY');

  const privateKeyBuffer = await window.crypto.subtle.exportKey(
    'pkcs8',
    keyPair.privateKey
  );
  const privateKeyPEM = pemEncode(privateKeyBuffer, 'PRIVATE KEY');

  localStorage.setItem(`rsa-private-key-${userId}`, privateKeyPEM);

  await axiosWithAuth.post('/user/me/public-key', {
    public_key: publicKeyPEM,
  });

  return { publicKeyPEM, privateKeyPEM };
}

export async function generateAESKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function fetchRSAPublicKey(): Promise<string> {
  const data = await axiosWithAuth.get(`/users/me/public-key`);
  return data.data.public_key; // string in PEM format
}

export async function importRSAPublicKey(pem: string): Promise<CryptoKey> {
  // Bersihkan PEM header/footer
  const b64 = pem
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s+/g, '');
  const binaryDer = Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0));

  return await crypto.subtle.importKey(
    'spki',
    binaryDer.buffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    false,
    ['encrypt']
  );
}

export async function exportAESKeyRaw(key: CryptoKey): Promise<ArrayBuffer> {
  return await crypto.subtle.exportKey('raw', key);
}

export async function encryptAESKeyWithRSAPublicKey(
  aesKey: CryptoKey,
  rsaPublicKey: CryptoKey
): Promise<ArrayBuffer> {
  const rawAesKey = await exportAESKeyRaw(aesKey);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    rsaPublicKey,
    rawAesKey
  );

  return encrypted;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce(
    (str, byte) => str + String.fromCharCode(byte),
    ''
  );
  return btoa(binary);
}

async function generateEncryptGroupKey(groupKey: CryptoKey, userIds: string[]) {
  const pem = await fetchRSAPublicKey();
  const rsaKey = await importRSAPublicKey(pem);
  const encryptedKey = await encryptAESKeyWithRSAPublicKey(groupKey, rsaKey);
  const base64Key = arrayBufferToBase64(encryptedKey);

  return base64Key;
}

// Fungsi enkripsi pesan, yang menerima parameter plaintext dan gck
export async function encryptMessage(
  plaintext: string, // original pesan
  gck: CryptoKey
): Promise<{ ciphertext: string; iv: string }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // Generate random IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // penerapan enkripsi AES pada data pesan
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    gck,
    data
  );

  // Convert ke base64
  const ciphertext = window.btoa(
    String.fromCharCode(...new Uint8Array(encrypted))
  ); // pesan yang sudah di enkripsi
  const ivBase64 = window.btoa(String.fromCharCode(...iv));

  return { ciphertext, iv: ivBase64 };
}

// fungsi untuk mendekripsi pesan yang sudah di enkripsi, yang menerima parameter ciphertext dan iv, dan gck
export async function decryptMessage(
  ciphertextBase64: string, // data pesan yang sudah di enkripsi
  ivBase64: string,
  gck: CryptoKey
): Promise<string> {
  const ciphertext = Uint8Array.from(atob(ciphertextBase64), (c) =>
    c.charCodeAt(0)
  );
  const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));

  // penerapan code untuk melakukan dekripsi pesan menggunakan algoritma AES dengan IV
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    gck,
    ciphertext
  );

  // code untuk mengubah ciphertext menjadi string
  const decoder = new TextDecoder();
  const plaintext = decoder.decode(decrypted); // pesan yang sudah di dekripsi / original

  return plaintext;
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  try {
    const b64Lines = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
    const binary = atob(b64Lines);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error('Failed to convert PEM to ArrayBuffer:', error);
    throw new Error('Invalid PEM format');
  }
}

export async function decryptEncryptedKey(
  encryptedKeyBase64: string,
  privateKeyPem: string
): Promise<CryptoKey> {
  try {
    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      pemToArrayBuffer(privateKeyPem),
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      false,
      ['decrypt']
    );

    const encryptedKey = Uint8Array.from(atob(encryptedKeyBase64), (c) =>
      c.charCodeAt(0)
    );

    const rawKey = await crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      encryptedKey
    );

    const gck = await crypto.subtle.importKey(
      'raw',
      rawKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );

    return gck;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to decrypt and import GCK');
  }
}
