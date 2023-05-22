export default function changeFileExtension(path, newExtension) {
// Replace the old extension with the new one in the path/URL
  return path.replace(/(\.[\w\d_-]+)$/i, `.${newExtension}`);
}
