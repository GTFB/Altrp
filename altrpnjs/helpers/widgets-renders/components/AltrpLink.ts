import BasicLink from './BasicLink';
import objectToStylesString from '../../objectToStylesString';

export default function AltrpLink(
  text: string,
  attrs: {
    creativelink?: any;
    children?: string;
    className?: string;
    link?: {};
  } = {}
) {
  attrs.children = attrs.children || text;
  let link = BasicLink(attrs);

  //creative link
  let creativeLink: string = '';
  if (attrs.creativelink) {
    let creativeLinkStyles = attrs.creativelink;
    let styles = {
      label: '',
      size: '',
      style: '',
    };

    if (creativeLinkStyles) {
      styles = { ...styles, ...creativeLinkStyles };
    }

    let forStyles: {
      'transition-duration'?: string;
    } = {};

    if (styles.size) {
      forStyles['transition-duration'] = styles.size + 's';
    } else {
      forStyles['transition-duration'] = '0.2s';
    }

    const linkSettings = {
      ...attrs.link,
      creativeLink: true,
    };

    switch (styles.style) {
      case 'none':
        creativeLink = '';
        break;
      case 'cl-style-1':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-1-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative">
<div class="altrp-link-cl-style-1 altrp-link-cl-style-1-left" style="${objectToStylesString(
            forStyles
          )}" >
[</div>
  ${text}
<div class="altrp-link-cl-style-1 altrp-link-cl-style-1-right" style="${objectToStylesString(
            forStyles
          )}" >
]</div>
</div>`,
        });

        break;
      case 'cl-style-2':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-2-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative  altrp-link-cl-style-2-container" style="${objectToStylesString(
            forStyles
          )}">
  ${text}
</div>`,
        });
        break;
      case 'cl-style-3':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-3-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-3" style="${objectToStylesString(
            forStyles
          )}">
  ${text}
</div>`,
        });

        break;
      case 'cl-style-4':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-4-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-4" style="${objectToStylesString(
            forStyles
          )}">
  ${text}
</div>`,
        });
        break;
      case 'cl-style-5':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-5-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-5" style="${objectToStylesString(
            forStyles
          )}">
  ${text}
  <div class="altrp-link-cl-style-5-clone" >
  ${text}
  </div>
</div>`,
        });
        break;
      case 'cl-style-6':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-6-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-6" style="${objectToStylesString(
            forStyles
          )}">
  ${text}
</div>`,
        });
        break;
      case 'cl-style-7':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-7-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-7" style="${objectToStylesString(
            forStyles
          )}">
  ${text}
</div>`,
        });
        break;
      case 'cl-style-8':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-8-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-8" style="${objectToStylesString(
            forStyles
          )}">
  ${text}
</div>`,
        });
        break;
      case 'cl-style-9':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-9-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-9" style="${objectToStylesString(
            forStyles
          )}">
${text}<div class="altrp-link-cl-style-9-description" style="${objectToStylesString(forStyles)}" >
${text}</div></div>`,
        });
        break;
      case 'cl-style-10':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-10-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-10" style="${objectToStylesString(
            forStyles
          )}">
          <div class="altrp-link-cl-style-10-content" >
${text}</div></div>`,
        });
        break;
      case 'cl-style-11':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-11-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-11" data-hover="${text}" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-12':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-12-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-12" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-13':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-13-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-13" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-14':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-14-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-14" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-15':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-15-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-15" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-16':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-16-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-16" data-hover="${text}" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-17':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-16-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-17" data-hover="${text}" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-18':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-18-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-18" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-19':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-19-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-19" data-hover="${text}" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-20':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-20-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-20" data-hover="${text}" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-21':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-21-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-21" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-22':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-22-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-22" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-23':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-23-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-23" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-24':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-24-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-24" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-25':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-25-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-25" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-26':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-26-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-26" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-27':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-27-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-27" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-28':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-28-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-28" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
      case 'cl-style-29':
        creativeLink = BasicLink({
          ...attrs,
          classlink: 'altrp-link-cl-style-29-link',
          link: linkSettings,
          children: `<div class="altrp-link-creative altrp-link-cl-style-29" style="${objectToStylesString(
            forStyles
          )}">
${text}</div>`,
        });
        break;
    }
  }
  //creative link закончился))))

  return creativeLink ? creativeLink : link;
}
