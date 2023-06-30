export default function stripHtmlTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}
