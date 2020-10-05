import Template from './Template';
/**
 * @property {Template} template
 * @property {Object} settings
 * */
class Area {
  static areaFabric(areaData){
    let area = new Area();
    area.settings = areaData.settings;
    area.id = areaData.id;
    area.template = new Template();
    area.template.data = areaData.template ? JSON.parse(areaData.template.data) : null;
    area.template.id = areaData.template ? areaData.template.id : null;
    if(areaData.area_name === 'popups'){
      // area.templates = [];
      // area.templates = new Template();
      area.templates = [];
      areaData.templates = areaData.templates || [];
      areaData.templates.forEach(_t=>{
        let template = new Template();
        template.data = _t ? JSON.parse(_t.data) : null;
        template.id = _t ? JSON.parse(_t.id) : null;
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
  getTemplates(){
    this.templates = this.templates || [];
    return this.templates;
  }
}

export default Area