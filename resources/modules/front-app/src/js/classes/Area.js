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
    return area;
  }
}

export default Area