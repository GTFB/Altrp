export default function parseIDFromYoutubeURL(youtubeURL) {
  const startIndex = youtubeURL.indexOf("v=") + 2;
  const endIndex = youtubeURL.indexOf("&", startIndex);

  return youtubeURL.substring(startIndex, endIndex);
}
