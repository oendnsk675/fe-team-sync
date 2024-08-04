export function loadAvatarImage(data: any, size: number) {
  let name = data.fullname.replace(/ /g, "+");
  let baseUrl = `https://ui-avatars.com/api/?name=${name}`;
  if (size) baseUrl += `&size=${size}`;
  return baseUrl;
}

export function formatAvatarImage(data: any) {
  return `http://localhost:3000/uploads/avatars/${data}`;
}
