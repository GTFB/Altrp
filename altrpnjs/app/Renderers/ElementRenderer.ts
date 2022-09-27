import {string} from '@ioc:Adonis/Core/Helpers'
import app_path from "../../helpers/path/app_path";
import fs from "fs";
import * as mustache from 'mustache'
import * as _ from 'lodash'
import DEFAULT_REACT_ELEMENTS from "../../helpers/const/DEFAULT_REACT_ELEMENTS";
import objectToStylesString from "../../helpers/objectToStylesString";
import base_path from "../../helpers/path/base_path";
import isProd from "../../helpers/isProd";
import getResponsiveSetting from "../../helpers/getResponsiveSetting";
import getColumnClasses from "../../helpers/getColumnClasses";
import renderSectionBG from "../../helpers/renderSectionBG";
import getAddingClasses from "../../helpers/getAddingClasses";
import renderSection from "../../helpers/widgets-renders/renderSection";
import getSectionWidthClass from "../../helpers/widgets-renders/getSectionWidthClass";
import Role from "App/Models/Role";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";
import AltrpSkeletonBox from "../../helpers/widgets-renders/components/AltrpSkeletonBox";
import stringifyWrapperAttributes from "../../helpers/widgets-renders/functions/stringifyWrapperAttributes";


export default class ElementRenderer {
  static straightRenderIgnore = [
    // 'input-radio',
    // 'input-checkbox',
    // 'section_widget',
  ]
  public static wrapperStub = app_path('altrp-templates/views/element-wrapper.stub')
  private elementStub: string

  constructor(private element: {
    children: [],
    settingsLock: {},
    settings: {
      conditional_display_choose: string;
      conditional_roles?: [];
      text?: string;
      content?: string;
      advanced_element_id?: string,
      layout_html_tag?: string
      react_element?: boolean
      'skeleton:enable'?: boolean
      layout_content_width_type?: string
      isFixed?: boolean
      default_hidden: boolean
    },
    name: string,
    type: 'widget' | 'section' | 'column',
    id: string,
  }) {

    this.elementStub = app_path(`altrp-templates/views/elements${
      this.element.type === 'widget' ? '/widgets' : ''
    }/${this.element.name}.stub`)
  }

  async render(screenName: string): Promise<string> {
    const settings = this.element.settings
    let reactElement = this.element.settings?.react_element || (DEFAULT_REACT_ELEMENTS.indexOf(this.getName()) !== -1)
    if(! reactElement && this.element.settings['skeleton:enable']){
      reactElement = true
    }
    const layout_html_tag = this.element.settings?.layout_html_tag || 'div'
    this.element.settingsLock = this.element.settingsLock || {}
    this.element.settings = {
      ...this.element.settings,
      ...this.element.settingsLock
    }

    let {
      advanced_element_id,
      conditional_display_choose,
      conditional_roles,
    } = this.element.settings
    let children_content = ''
    for (const child of this.element.children) {
      let renderer = new ElementRenderer(child)
      children_content += await renderer.render(screenName)
    }
    let element_content = '';
    const columns_count = this.element.children.length;

    if(settings['skeleton:enable']){
      element_content = AltrpSkeletonBox(settings, screenName)
    } else {
      let section_background
      switch (this.getName()) {
        case 'section_widget':
        case 'section': {
          section_background = renderSectionBG(settings, this.getId(), screenName)
        }
          break;
        default: {
          section_background = ''

        }
          break
      }
      let styles: {} | string = {}
      const {layout_content_width_type: widthType, isFixed} = this.element.settings
      let section_classes = ''

      const fitToContent = getResponsiveSetting(settings, "layout_height", screenName)
      if (fitToContent === "fit") {
        section_classes += " section-fit-to-content ";
      }
      switch (this.getName()) {
        case 'section': {
          if (widthType === "boxed" && !isFixed) {
            section_classes += " altrp-section_boxed ";
          }
          if (widthType === "section_boxed" && !isFixed) {
            section_classes += " altrp-section_section-boxed "
          }

          if (widthType === "full" && !isFixed) {
          }
          section_classes += getSectionWidthClass(settings)

        }
          break;
      }

      styles = objectToStylesString(styles)
      const text_widget_content = this.getTextWidgetContent(screenName)

      if (this.getType() === 'widget') {
        const filename = string.camelCase(`render_${this.getName()}`)
          + (isProd() ? '.js' : '.ts')
        if (fs.existsSync(base_path(`helpers/widgets-renders/${filename}`))) {
          let render = isProd() ? require(base_path(`helpers/widgets-renders/${filename}`))
            : await import(base_path(`helpers/widgets-renders/${filename}`))
          render = render.default
          element_content = render(this.element.settings, screenName,)
        }
        if (this.getName() === 'section_widget') {
          element_content =
            renderSection(
              settings,
              screenName,
              this.element.children.length,
              this.isLink() ? 'altrp-pointer' : '',
              children_content,
              section_background
            );
        }
        element_content =
          await applyPluginsFiltersAsync(
            `after_render_widget_${this.getName()}`,
            element_content,
            settings,
            screenName)
      } else {
        element_content = fs.readFileSync(this.elementStub, {encoding: 'utf8'})
        element_content = mustache.render(element_content, {
          settings: JSON.stringify(this.element.settings),
          id: this.element.id,
          children_content,
          element_styles: styles,
          section_classes,
          column_classes: getColumnClasses(settings, screenName),
          section_background,
          layout_html_tag,
          text_widget_content,
          link_class: this.isLink() ? 'altrp-pointer' : '',
          columns_count,
        })

      }
    }

    let content = fs.readFileSync(ElementRenderer.wrapperStub, {encoding: 'utf8'});
    let classes = `altrp-element altrp-element${this.getId()} altrp-element_${this.getType()} ${getAddingClasses(settings, screenName)} `;

    if (this.getType() === "widget") {
      classes += ` altrp-widget_${this.getName()}`;
    }
    let allow_start_tag = ''
    let allow_end_tag = ''
    conditional_roles = conditional_roles || []
    if (conditional_roles?.length && conditional_display_choose === 'auth') {
      // @ts-ignore
      if(conditional_roles.length && Number(conditional_roles[0])) {
        // @ts-ignore
        conditional_roles = await Role.query().whereIn('id', conditional_roles)
        // @ts-ignore
        conditional_roles = conditional_roles.map(r => r.name)

      }
      // @ts-ignore
      conditional_roles.forEach(r=>{
        classes += ` altrp-element-role_${r} `
      })
    }

    if(conditional_display_choose){
      classes += ` altrp-element-auth-type_${conditional_display_choose} `
    }

    let wrapper_attributes = `class="${classes}" style="${this.element.settings.default_hidden ? 'display:none;' : ''}"
    ${getResponsiveSetting(settings, 'en_an', screenName)
      ? `data-enter-animation-type="${getResponsiveSetting(settings, 'en_an', screenName)}"
      data-enter-animation-delay="${getResponsiveSetting(settings, 'en_a_delay', screenName, 0)?.size || 0}"
      data-enter-animation-duration="${getResponsiveSetting(settings, 'en_a_duration', screenName, 0)?.size || 400}"
      `
      : ''}
      ${reactElement ? `data-react-element="${this.getId()}"` : ''}
    ${_.isEmpty(getResponsiveSetting(settings, 'wrapper_click_actions', screenName)) ? '' : `data-altrp-wrapper-click-actions="${this.getIdForAction()}"`}
    ${_.isEmpty(getResponsiveSetting(settings, 'wrapper_appearB_actions', screenName)) ? '' : `data-altrp-wrapper-appear-bottom-actions="${this.getIdForAction()}"`}
    ${_.isEmpty(getResponsiveSetting(settings, 'wrapper_appearT_actions', screenName)) ? '' : `data-altrp-wrapper-appear-top-actions="${this.getIdForAction()}"`}
    ${_.isEmpty(getResponsiveSetting(settings, 'sticky', screenName)) ?
      '' :
      `data-altrp-sticky="${getResponsiveSetting(settings, 'sticky', screenName)}"
    data-altrp-sticky-spacing="${getResponsiveSetting(settings, 'st_spacing', screenName)}"
    data-margin-top="${getResponsiveSetting(settings, 'st_spacing', screenName, 0)}"`}
    data-altrp-id="${this.getId()}" data-altrp-element="${this.getName()}"
    `

    wrapper_attributes = wrapper_attributes.replace(/\s+/g, ' ');
    if (advanced_element_id) {
      wrapper_attributes += ` id="${advanced_element_id}" `
    }
    wrapper_attributes += stringifyWrapperAttributes(settings, screenName)
    content = mustache.render(content, {
      id: this.getId(),
      element_content,
      type: this.getType(),
      wrapper_attributes,
      allow_start_tag,
      allow_end_tag,
    })
    return content
  }

  private getId() {
    return this.element.id
  }

  private getType(): 'widget' | 'section' | 'column' {
    return this.element.type
  }

  private getName() {
    return this.element.name
  }

  private getIdForAction() {
    return this.element.id
  }

  private isLink() {
    return !!_.get(this, 'element.settings.link_link.url');
  }

  private getTextWidgetContent(screenName): string {
    if (this.getName() !== 'text') {
      return ''
    }
    return `<div class="altrp-text ck ck-content">${getResponsiveSetting(this.element.settings, 'text', screenName, '')}</div>`
  }

}
