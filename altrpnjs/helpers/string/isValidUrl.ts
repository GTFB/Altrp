export default function isValidUrl(url) {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}
