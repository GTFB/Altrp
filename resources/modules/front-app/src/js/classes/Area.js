import Template from "./Template";
/**
 * @property {Template} template
 * @property {Object} settings
 * */
class Area {
  static areaFabric(areaData) {
    let area = new Area();
    area.settings = areaData.settings;
    area.id = areaData.id;
    area.template = new Template();
    area.template.data = areaData.template
      ? areaData.template.data
      : null;
    if(_.isString(area.template.data)){
      area.template.data = JSON.parse(area.template.data);
    }
    area.template.id = areaData.template ? areaData.template.id : null;
    area.template.name =  areaData.template ?  areaData.template.name : '';
    if (areaData.area_name === "popups") {
      // area.templates = [];
      // area.templates = new Template();
      area.templates = [];
      areaData.templates = areaData.templates || [];
      areaData.templates.forEach(_t => {
        let template = new Template();
        template.data = _t ? _t.data : null;
        if(_.isString(template.data)){
          template.data = JSON.parse(template.data);
        }
        template.name = _t ? _t.name : '';
        template.id = _t ? JSON.parse(_t.id) : null;
        template.guid = _t ? _t.guid : null;
        template.template_settings = _t ? _t.template_settings : [];
        template.triggers = _t ? _t.triggers : {};
        area.templates.push(template);
      });
    }
    return area;
  }

  /**
   * Массив шаблонов
   * @return {*|Array}
   */
  getTemplates() {
    this.templates = this.templates || [];
    return this.templates;
  }

  /**
   * Проверка является ли область пользовательской
   * @return {boolean}
   */
  isCustomArea(){
    return ! ! _.get(this.settings, 'area_type');
  }
  /**
   * Проверка является ли область пользовательской
   * @return {[string]}
   */
  getAreaClasses(){
    if(this.CSSclasses){
      return this.CSSclasses;
    }
    this.CSSclasses = [];
    this.CSSclasses.push(`app-area_id-${this.settings.area_type}`);
    this.settings.sidebar_type && this.CSSclasses.push(`app-area_${this.settings.sidebar_type}`);
    this.settings.sidebar_location && this.CSSclasses.push(`app-area_sidebar-location-${this.settings.sidebar_location}`);
    return this.CSSclasses;
  }
}

export default Area;
