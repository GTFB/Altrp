import app_path from "../../helpers/app_path";
import fs from "fs";
import * as mustache from 'mustache'
import * as _ from 'lodash'
import DEFAULT_REACT_ELEMENTS from "../../helpers/const/DEFAULT_REACT_ELEMENTS";
import objectToStylesString from "../../helpers/objectToStylesString";

export default class ElementRenderer {
  public static wrapperStub = app_path('altrp-templates/views/element-wrapper.stub')
  private elementStub: string
  constructor(private element: {
    children: [],
    settingsLock: {},
    settings: {
      advanced_element_id?: string,
      layout_html_tag?: string
      react_element?:boolean
      layout_content_width_type?:string
      isFixed?:boolean
    },
    name: string,
    type: string,
    id: string,
  }) {

    this.elementStub = app_path(`altrp-templates/views/elements${
      this.element.type === 'widget'? '/widgets' : ''
    }/${this.element.name}.stub`)
  }
  async render(): Promise<string>{
    const reactElement =  this.element.settings?.react_element || (DEFAULT_REACT_ELEMENTS.indexOf(this.getName()) !== -1)
    const layout_html_tag = this.element.settings?.layout_html_tag || 'div'
    this.element.settingsLock = this.element.settingsLock || {}
    this.element.settings = {
      ...this.element.settings,
      ...this.element.settingsLock
    }
    const {advanced_element_id} = this.element.settings
    let children_content = ''
    for (const child of this.element.children){
      let renderer = new ElementRenderer(child)
      children_content += await renderer.render()
    }
    let element_content = '';
    const columns_count = this.element.children.length;

    if(fs.existsSync(this.elementStub)){
      let section_background
      switch (this.getName()) {
        case 'section_widget':
        case 'section':{
          section_background = `{{{renderSectionBG(element${this.getId()}_settings,'${this.getId()}', device)}}}`
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
      element_content = fs.readFileSync(this.elementStub, {encoding: 'utf8'})
      element_content = mustache.render(element_content, {
        settings: JSON.stringify(this.element.settings),
        id: this.element.id,
        children_content,
        element_styles:styles,
        section_classes,
        column_classes: `{{getColumnClasses(element${this.getId()}_settings, device)}}`,
        section_background,
        layout_html_tag,
        link_class: this.isLink() ? 'altrp-pointer' : '',
        columns_count,
      })
    } else {
      console.error(`Template for ${this.element.name} not found!`);
    }

    let content = fs.readFileSync(ElementRenderer.wrapperStub, {encoding: 'utf8'});
    let classes = `altrp-element altrp-element${this.getId()} altrp-element_${this.getType()} {{{getAddingClasses(element${this.getId()}_settings)}}} `;
    if (this.getType() === "widget") {
      classes += ` altrp-widget_${this.getName()}`;
    }
    let wrapper_attributes = `class="${classes}"
    {{{getResponsiveSetting(element${this.getId()}_settings, 'en_an', screen)
      ? \`data-enter-animation-type="\${getResponsiveSetting(element${this.getId()}_settings, 'en_an', device)}"
      data-enter-animation-delay="\${getResponsiveSetting(element${this.getId()}_settings, 'en_a_delay', device, 0)}"
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
    `

    wrapper_attributes = wrapper_attributes.replace(/\s+/g, ' ');
    if(advanced_element_id){
      wrapper_attributes += ` id="${advanced_element_id}" `
    }
    content = mustache.render(content, {
      settings: JSON.stringify(this.element.settings).replace(/\//g, '\\/'),
      id: this.getId(),
      element_content,
      type: this.getType(),
      wrapper_attributes
    })
    return content
  }

  private getId() {
    return this.element.id
  }

  private getType() {
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
}
