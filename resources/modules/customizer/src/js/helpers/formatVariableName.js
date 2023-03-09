export default function formatVariableName(str) {
  str = str.replace(/[^a-zA-Z0-9_$.]/g, '_');
  str = str.replace(/^\d+/g, '_');
  return str;
}
