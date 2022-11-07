
export function getFormat(str, dot = true) {
  let format = str.match(/\.([a-zA-Z]+)$/)
  if (format) {
    return dot ? format[0] : format[1]
  }
  return ''
}
