export default function getCookie(cookie, name) {
  const value = `; ${cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2 && parts) {
    //@ts-ignore
    return decodeURI(parts.pop().split(';').shift());
  }
}
