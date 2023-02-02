export default function prepareSVG(svg: string): string {
  svg = svg.replace(/<\?xml[\s\S]*?\?>/g, '')
  svg = svg.replace(/<!--[\s\S]*?-->/g, '')
  svg = svg.replace(/<![\s\S]*?>/g, '')
  svg = svg.replace(/<\?[\s\S]*?\?>/g, '')
  svg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
return svg
}
