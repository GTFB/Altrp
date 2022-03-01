import BaseNode from "App/Customizer/Nodes/BaseNode";
import NodeInterface from "App/Customizer/Nodes/NodeInterface";
import data_get from "../../../helpers/data_get";
import ListenerGenerator from "App/Generators/ListenerGenerator";

export default class ListenerNode extends BaseNode implements NodeInterface
{
  public generate(data, customizer) {
    customizer.related('altrp_model').query().firstOrFail().then(model => {
      const generator = new ListenerGenerator()

      generator.run(model, data)
    })
  }
}
