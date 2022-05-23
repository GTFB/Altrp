import { string } from '@ioc:Adonis/Core/Helpers'
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

export default class ElementRenderer {
  static straightRenderIgnore = [
    'input-radio',
    'input-checkbox',
    'section_widget',
  ]
  public static wrapperStub = app_path('altrp-templates/views/element-wrapper.stub')
  private elementStub: string
  constructor(private element: {
    children: [],
    settingsLock: {},
    settings: {
      conditional_display_choose: string;
      conditional_permissions?: [];
      conditional_roles?: [];
      text?: string;
      content?: string;
      advanced_element_id?: string,
      layout_html_tag?: string
      react_element?:boolean
      layout_content_width_type?:string
      isFixed?:boolean
      default_hidden: boolean
    },
    name: string,
    type: 'widget' | 'section' | 'column',
    id: string,
  }) {

    this.elementStub = app_path(`altrp-templates/views/elements${
      this.element.type === 'widget'? '/widgets' : ''
    }/${this.element.name}.stub`)
  }
  async render(screenName:string): Promise<string>{
    const settings = this.element.settings
    const reactElement =  this.element.settings?.react_element || (DEFAULT_REACT_ELEMENTS.indexOf(this.getName()) !== -1)
    const layout_html_tag = this.element.settings?.layout_html_tag || 'div'
    this.element.settingsLock = this.element.settingsLock || {}
    this.element.settings = {
      ...this.element.settings,
      ...this.element.settingsLock
    }

    const {
      advanced_element_id,
      conditional_display_choose,
      conditional_roles,
      conditional_permissions,
    } = this.element.settings
    let children_content = ''
    for (const child of this.element.children){
      let renderer = new ElementRenderer(child)
      children_content += await renderer.render(screenName)
    }
    let element_content = '';
    const columns_count = this.element.children.length;

    if(fs.existsSync(this.elementStub)){
      let section_background
      switch (this.getName()) {
        case 'section_widget':
        case 'section':{
          section_background = renderSectionBG(settings,this.getId(), screenName)
        }break;
        default:{
          section_background = ''

        }break
      }
      let styles:{}|string = {}
      const {layout_content_width_type:widthType, isFixed} = this.element.settings
      let section_classes = ''
      switch (this.getName() ){
        case 'section':{
          if (widthType === "boxed" && !isFixed) {
            section_classes = " altrp-section_boxed ";
            styles['max-width'] = '100%'
          }
          if (widthType === "section_boxed" && !isFixed) {
            section_classes = " altrp-section_section-boxed "
          }

          if (widthType === "full" && !isFixed) {
            section_classes = " altrp-section--full-width "
          }
        }
        break;
      }

      styles = objectToStylesString(styles)
      const text_widget_content = this.getTextWidgetContent(screenName)
      if(this.getType() === 'widget'
        && ElementRenderer.straightRenderIgnore.indexOf(this.getName()) === -1){
        const filename = string.camelCase(`render_${this.getName()}`)
          + (isProd() ? '.js' : '.ts')
        if(fs.existsSync(base_path(`helpers/widgets-renders/${filename}`))){
          let render = isProd() ? require(base_path(`helpers/widgets-renders/${filename}`))
            : await import(base_path(`helpers/widgets-renders/${filename}`))
          render = render.default
          element_content =  render(this.element.settings, screenName)
        }
      } else {
        element_content = fs.readFileSync(this.elementStub, {encoding: 'utf8'})
        element_content = mustache.render(element_content, {
          settings: JSON.stringify(this.element.settings),
          id: this.element.id,
          children_content,
          element_styles:styles,
          section_classes,
          column_classes: getColumnClasses(settings, screenName),
          section_background,
          layout_html_tag,
          text_widget_content,
          link_class: this.isLink() ? 'altrp-pointer' : '',
          columns_count,
        })

      }
    } else {
      console.error(`Template for ${this.element.name} not found!`);
    }

    let content = fs.readFileSync(ElementRenderer.wrapperStub, {encoding: 'utf8'});
    let classes = `altrp-element altrp-element${this.getId()} altrp-element_${this.getType()} ${getAddingClasses(settings)} `;
    if (this.getType() === "widget") {
      classes += ` altrp-widget_${this.getName()}`;
    }
    let allow_start_tag = ''
    let allow_end_tag = ''
    if(conditional_display_choose ||
      (conditional_permissions?.length || conditional_roles?.length)){
      allow_start_tag = `@if(allowedForUser(element${this.getId()}_settings, user))~`
      allow_end_tag = `@end~`
    }

    let wrapper_attributes = `class="${classes}" style="${this.element.settings.default_hidden ? 'display:none;' : ''}"
    ${getResponsiveSetting(settings, 'en_an', screenName)
      ? `data-enter-animation-type="${getResponsiveSetting(settings, 'en_an', screenName)}"
      data-enter-animation-delay="${getResponsiveSetting(settings, 'en_a_delay', screenName, 0)}"
      `
      : ''}
      ${reactElement ? `data-react-element="${this.getId()}"` : ''}
    ${_.isEmpty(getResponsiveSetting(settings, 'wrapper_click_actions', screenName)) ? '' : `data-altrp-wrapper-click-actions="${this.getIdForAction()}"` }
    ${_.isEmpty(getResponsiveSetting(settings, 'wrapper_appearB_actions', screenName)) ? '' : `data-altrp-wrapper-appear-bottom-actions="${this.getIdForAction()}"` }
    ${_.isEmpty(getResponsiveSetting(settings, 'wrapper_appearT_actions', screenName)) ? '' : `data-altrp-wrapper-appear-top-actions="${this.getIdForAction()}"` }
    ${_.isEmpty(getResponsiveSetting(settings, 'sticky', screenName)) ?
    '' :
    `data-altrp-sticky="${getResponsiveSetting(settings, 'sticky', screenName)}"
    data-altrp-sticky-spacing="${getResponsiveSetting(settings, 'st_spacing', screenName)}"
    data-margin-top="${getResponsiveSetting(settings, 'st_spacing', screenName, 0)}"` }
    data-altrp-id="${this.getId()}"
    `

    wrapper_attributes = wrapper_attributes.replace(/\s+/g, ' ');
    if(advanced_element_id){
      wrapper_attributes += ` id="${advanced_element_id}" `
    }
    content = mustache.render(content, {
      id: this.getId(),
      element_content,
      set_content:this.getEdgeSetContent(!!allow_start_tag),
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
  private getIdForAction(){
    return this.element.id
  }
  private isLink(){
    return ! !_.get(this, 'element.settings.link_link.url');
  }

  private getTextWidgetContent(screenName):string {
    if(this.getName() !== 'text'){
      return ''
    }
    if(this.element.settings.content){
      return `<div class="altrp-text ck ck-content">{{{data_get(altrpContext, '${this.element.settings.content}', '${this.element.settings.text || ''}')}}}</div>`
    }
    return `<div class="altrp-text ck ck-content">${getResponsiveSetting(this.element.settings, 'text', screenName, '')}</div>`
  }

  private getEdgeSetContent(allow_start_tag: boolean = false):string{
    if(ElementRenderer.straightRenderIgnore.indexOf(this.getName()) === -1 && ! allow_start_tag){
      return ''
    }

    let settings = {...this.element.settings}

    return `@set('element${this.getId()}_settings', ${JSON.stringify(settings).replace(/\//g, '\\/')})~`
  }
}
