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
    area.template.data = JSON.parse(areaData.template.data);
    area.template.id = areaData.template.id;
    return area;
  }
}

export default Area