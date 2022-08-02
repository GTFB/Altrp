import * as _ from 'lodash';
export default function BasicLink(attrs): string {
  let classes = attrs.className;

  let settings: any = {
    attributes: '',
    openInNew: false,
    noFollow: false,
    url: '/',
    tag: attrs.tag || 'a',
    to: attrs.to || _.get(this, 'props.link.url', '/'),
    href: attrs.href || _.get(this, 'props.link.url', '/'),
    toPrevPage: false,
  };

  if (attrs.link) {
    settings = {
      ...settings,
      ...attrs.link,
    };
  }

  if (attrs.rel === 'nofollow') {
    settings.noFollow = true;
  }

  let rel = '';
  if (settings.noFollow) {
    rel = 'noFollow';
  }

  let target: string = '';

  if (attrs.target === '_black') {
    target = '_black';
  }

  let styleChildren = {};

  if (attrs.style) {
    styleChildren = attrs.style;
  }

  let className = classes;

  if (attrs.classlink) {
    className += ' altrp-link' + ' ' + attrs.classlink;
  }

  let children = attrs.children;

  if (attrs.dangerouslySetInnerHTMLCondition || settings.creativeLink === false) {
    children = `<span class="altrp-inherit">${attrs.children}</span>`;
  }

  return `<a href="${settings.href}" rel="${rel}" target="${target}" style="${styleChildren}" class="${className}">${children}</a>`;
}
