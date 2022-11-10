const result = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

export default function webpSupport() {
  return result
}
