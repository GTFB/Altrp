import getResponsiveSetting from "../getResponsiveSetting";

export default function renderHtml(settings, device, ) {
  let data = getResponsiveSetting(settings,"data", device);
  return `<div>${data || ''}</div>`
}
