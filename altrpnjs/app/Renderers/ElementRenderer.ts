import app_path from '../../helpers/path/app_path';
import fs from 'fs';
import * as mustache from 'mustache';
import * as _ from 'lodash';
import DEFAULT_REACT_ELEMENTS from '../../helpers/const/DEFAULT_REACT_ELEMENTS';
import objectToStylesString from '../../helpers/objectToStylesString';
import toUnicode from '../../helpers/string/toUnicode';
import getResponsiveSetting from '../../helpers/getResponsiveSetting';

export default class ElementRenderer {
  public static wrapperStub = app_path('altrp-templates/views/element-wrapper.stub');
  private elementStub: string;
  constructor(
    private element: {
      children: [];
      settingsLock: {};
      settings: {
        conditional_display_choose: string;
        conditional_permissions?: [];
        conditional_roles?: [];
        text?: string;
        content?: string;
        advanced_element_id?: string;
        layout_html_tag?: string;
        react_element?: boolean;
        layout_content_width_type?: string;
        isFixed?: boolean;
        default_hidden: boolean;
      };
      name: string;
      type: string;
      id: string;
    }
  ) {
    this.elementStub = app_path(
      `altrp-templates/views/elements${this.element.type === 'widget' ? '/widgets' : ''}/${
        this.element.name
      }.stub`
    );
  }
  async render(): Promise<string> {
    let settings = { ...this.element.settings };
    const reactElement =
      this.element.settings?.react_element || DEFAULT_REACT_ELEMENTS.indexOf(this.getName()) !== -1;
    const layout_html_tag = this.element.settings?.layout_html_tag || 'div';
    this.element.settingsLock = this.element.settingsLock || {};
    this.element.settings = {
      ...this.element.settings,
      ...this.element.settingsLock,
    };

    const {
      advanced_element_id,
      conditional_display_choose,
      conditional_roles,
      conditional_permissions,
    } = this.element.settings;
    let children_content = '';
    for (const child of this.element.children) {
      let renderer = new ElementRenderer(child);
      children_content += await renderer.render();
    }
    let element_content = '';
    const columns_count = this.element.children.length;

    if (fs.existsSync(this.elementStub)) {
      let section_background;
      switch (this.getName()) {
        case 'section_widget':
        case 'section':
          {
            section_background = `{{{renderSectionBG(element${this.getId()}_settings,'${this.getId()}', device)}}}`;
          }
          break;
        default:
          {
            section_background = '';
          }
          break;
      }
      let styles: {} | string = {};
      const { layout_content_width_type: widthType, isFixed } = this.element.settings;
      let section_classes = '';

      const fitToContent = getResponsiveSetting(settings, 'layout_height', '');
      if (fitToContent === 'fit') {
        section_classes += ' section-fit-to-content ';
      }
      switch (this.getName()) {
        case 'section':
          {
            if (widthType === 'boxed' && !isFixed) {
              section_classes += ' altrp-section_boxed ';
            }
            if (widthType === 'section_boxed' && !isFixed) {
              section_classes += ' altrp-section_section-boxed ';
            }

            if (widthType === 'full' && !isFixed) {
            }
            section_classes += ` {{getSectionWidthClass(element${this.getId()}_settings)}} `;
          }
          break;
      }

      styles = objectToStylesString(styles);
      const text_widget_content = this.getTextWidgetContent();
      element_content = fs.readFileSync(this.elementStub, { encoding: 'utf8' });
      element_content = mustache.render(element_content, {
        settings: JSON.stringify(this.element.settings),
        id: this.element.id,
        children_content,
        element_styles: styles,
        section_classes,
        column_classes: `{{getColumnClasses(element${this.getId()}_settings, device)}}`,
        section_background,
        layout_html_tag,
        text_widget_content,
        link_class: this.isLink() ? 'altrp-pointer' : '',
        columns_count,
      });
    } else {
      console.error(`Template for ${this.element.name} not found!`);
    }

    let content = fs.readFileSync(ElementRenderer.wrapperStub, { encoding: 'utf8' });
    let classes = `altrp-element altrp-element${this.getId()} altrp-element_${this.getType()} {{{getAddingClasses(element${this.getId()}_settings, screen)}}} `;
    if (this.getType() === 'widget') {
      classes += ` altrp-widget_${this.getName()}`;
    }
    let allow_start_tag = '';
    let allow_end_tag = '';
    if (
      conditional_display_choose ||
      conditional_permissions?.length ||
      conditional_roles?.length
    ) {
      allow_start_tag = `@if(allowedForUser(element${this.getId()}_settings, user))~`;
      allow_end_tag = `@end~`;
    }
    let wrapper_attributes = `class="${classes}" style="${
      this.element.settings.default_hidden ? 'display:none;' : ''
    }"
    {{{getResponsiveSetting(element${this.getId()}_settings, 'en_an', screen)
      ? \`data-enter-animation-type="\${getResponsiveSetting(element${this.getId()}_settings, 'en_an', device)}"
      data-enter-animation-delay="\${getResponsiveSetting(element${this.getId()}_settings, 'en_a_delay', device)?.size || 0}"
      data-enter-animation-duration="\${getResponsiveSetting(element${this.getId()}_settings, 'en_a_duration', device)?.size || 0}"
      \`
      : ''}}}
      ${reactElement ? `data-react-element="${this.getId()}"` : ''}
    {{{isEmpty(getResponsiveSetting(element${this.getId()}_settings, 'wrapper_click_actions', device)) ? '' : 'data-altrp-wrapper-click-actions="${this.getIdForAction()}"' }}}
    {{{isEmpty(getResponsiveSetting(element${this.getId()}_settings, 'wrapper_appearB_actions', device)) ? '' : 'data-altrp-wrapper-appear-bottom-actions="${this.getIdForAction()}"' }}}
    {{{isEmpty(getResponsiveSetting(element${this.getId()}_settings, 'wrapper_appearT_actions', device)) ? '' : 'data-altrp-wrapper-appear-top-actions="${this.getIdForAction()}"' }}}
    {{{isEmpty(getResponsiveSetting(element${this.getId()}_settings, 'sticky', device)) ?
    '' :
    \`data-altrp-sticky="\${getResponsiveSetting(element${this.getId()}_settings, 'sticky', device)}"
    data-altrp-sticky-spacing="\${getResponsiveSetting(element${this.getId()}_settings, 'st_spacing', device)}"
    data-margin-top="\${getResponsiveSetting(element${this.getId()}_settings, 'st_spacing', device, 0)}"\` }}}
    data-altrp-id="${this.getId()}"
    `;

    wrapper_attributes = wrapper_attributes.replace(/\s+/g, ' ');
    if (advanced_element_id) {
      wrapper_attributes += ` id="${advanced_element_id}" `;
    }
    /**
     * for widget with text content must replace )
     */
    if (['text', 'heading'].indexOf(this.getName()) !== -1) {
      for (let s in settings) {
        if (settings.hasOwnProperty(s) && _.isString(settings[s])) {
          settings[s] = toUnicode(settings[s], ['(', ')']);
        }
      }
    }
    content = mustache.render(content, {
      settings: JSON.stringify(settings).replace(/\//g, '\\/'),
      id: this.getId(),
      element_content,
      type: this.getType(),
      wrapper_attributes,
      allow_start_tag,
      allow_end_tag,
    });
    return content;
  }

  private getId() {
    return this.element.id;
  }

  private getType() {
    return this.element.type;
  }
  private getName() {
    return this.element.name;
  }
  private getIdForAction() {
    return this.element.id;
  }
  private isLink() {
    return !!_.get(this, 'element.settings.link_link.url');
  }

  private getTextWidgetContent(): string {
    if (this.getName() !== 'text') {
      return '';
    }
    if (this.element.settings.content) {
      return `<div class="altrp-text ck ck-content">{{{data_get(altrpContext, '${
        this.element.settings.content
      }', '${this.element.settings.text || ''}')}}}</div>`;
    }
    return `<div class="altrp-text ck ck-content">{{{getResponsiveSetting(element${this.getId()}_settings, 'text', device, '')}}}</div>`;
  }
}
