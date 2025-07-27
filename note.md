1. masih ada bug ketika drawer di open kemudian melakukan restart, disebabkan karna data task tidak ada di state global dan drawer kebuka jadinya error, **solusinya** gimana caranya ketika selesai ambil task di board.tsx langsung set task di global state supaya bisa dikonsumsi oleh drawer -> editor -> description
2. perlu tambahkan endpoint di backend untuk nerima gambar di editorjs ke nestjs

<!-- 26/07/2025 -->

FE:
⦁ Dashboard - selesaikan fitur chat
⦁ Chat Room - selesaikan fitur chat room

1. HOME
2. Sign-In, header masih kotor
3. Sign-up, Ketika selesai register baiknya di redirect ke sign-in
4. atasi kedipan bug, semisal spesifik route di larang dia masih akses ke halaman itu sebelum di kick, ini biasanya klo pengecekan dilakukan di client component.
5. Ketika pertama kali masuk ke layout TS informasi tim yg ke select di ganti menjadi default card(card: Choice a Team)
6. Teams,
   - Ketika create teams, baiknya langsung redirect ke halaman Utama teams Ketika berhasil tambah
7. integrasikan generator avatar untuk generate icon teams
8. add feature dark mode
