import replaceContentWithData from './replaceContentWithData';

export default function parseURLTemplate(URLTemplate = '', context = {}) {
  let url = URLTemplate;
  let protocol = '';
  url = url.trim();
  if (url.indexOf('{{') !== -1) {
    url = replaceContentWithData(url, context);
  }
  if (url.indexOf('https://') === 0) {
    protocol = 'https://';
    url = url.replace('https://', '');
  }
  if (url.indexOf('http://') === 0) {
    protocol = 'http://';
    url = url.replace('http://', '');
  }
  if (url.indexOf('mailto:') === 0) {
    protocol = 'mailto:';
    url = url.replace('mailto:', '');
  }
  if (url.indexOf('tel:') === 0) {
    protocol = 'tel:';
    url = url.replace('tel:', '');
  }
  // columnEditUrl = columnEditUrl.replace(':id', row.original.id);
  let idTemplates = url.match(/:([\s\S]+?)(\/|$)/g);
  if (!idTemplates) {
    return protocol + url;
  }
  idTemplates.forEach((idTemplate) => {
    let replace = context[idTemplate.replace(/:|\//g, '')] || '';
    idTemplate = idTemplate.replace('/', '');
    url = url.replace(new RegExp(idTemplate, 'g'), replace);
  });
  return protocol + url;
}
