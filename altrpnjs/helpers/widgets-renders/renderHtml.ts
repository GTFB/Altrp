import getContent from '../getContent';

export default function renderHtml(settings, device, context) {
  let data = getContent(settings, context, 'data', device);
  return `<div>${data}</div>`;
}
