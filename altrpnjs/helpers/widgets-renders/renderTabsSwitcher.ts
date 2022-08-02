import getResponsiveSetting from '../getResponsiveSetting';
import Switch from './components/Blueprint/Switch';
import replaceContentWithData from '../replaceContentWithData';

export default function renderTabsSwitcher(settings, device, context) {
  // section 1
  const oneTitle = getResponsiveSetting(settings, 'one_title', device, '');
  const oneType = getResponsiveSetting(settings, 'one_type', device, 'text');
  const oneWysiwyg = getResponsiveSetting(settings, 'one_wysiwyg', device, '');
  const oneTemplate = getResponsiveSetting(settings, 'one_template', device, '');
  // section 2
  const twoTitle = getResponsiveSetting(settings, 'two_title', device, '');
  const twoType = getResponsiveSetting(settings, 'two_type', device, 'text');
  const twoWysiwyg = getResponsiveSetting(settings, 'two_wysiwyg', device, '');
  const twoTemplate = getResponsiveSetting(settings, 'two_template', device, null);

  function getContent(type, contentValue) {
    if (type === 'text') {
      return `
        <div
          class="altrp-tabs-switcher_content-text ${contentValue.className}"
        >
          ${contentValue.wysiwyg}
        </div>
      `;
    } else if (type === 'template') {
      if (contentValue.template) {
        // const templateLoader = TemplateLoader({
        //   templateId: contentValue.template,
        // })

        const templateLoader = `<div className="inner-template"></div>`;

        return templateLoader;
      }
    }
  }

  const switcher = false;

  let content = !switcher
    ? getContent(oneType, {
        wysiwyg: oneWysiwyg,
        template: oneTemplate,
        className: 'altrp-tabs-switcher_content-one',
      })
    : getContent(twoType, {
        wysiwyg: twoWysiwyg,
        template: twoTemplate,
        className: 'altrp-tabs-switcher_content-two',
      });

  const blueprintSwitch = Switch({
    checked: switcher,
    className: 'altrp-tabs-switcher_switch',
  });

  return `
    <div class="altrp-tabs-switcher">
      <div class="altrp-tabs-switcher_wrapper">
        <div class="altrp-tabs-switcher_label altrp-tabs-switcher_label-one">
          ${replaceContentWithData(oneTitle, context)}
        </div>
        <div class = "altrp-tabs-switcher_switch-wrapper">
          ${blueprintSwitch}
        </div>
        <div class="altrp-tabs-switcher_label altrp-tabs-switcher_label-two">
          ${replaceContentWithData(twoTitle, context)}
        </div>
      </div>
      <div class="altrp-tabs-switcher_content">
        ${replaceContentWithData(content || '', context)}
      </div>
    </div>
  `;
}
