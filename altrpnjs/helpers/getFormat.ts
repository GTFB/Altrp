export function getFormat(str: string, dot: boolean = true): string {
  let format: RegExpMatchArray | null = str.match(/\.([a-zA-Z]+)$/)
  if (format) {
    return dot ? format[0] : format[1]
  }
  return ''
}
