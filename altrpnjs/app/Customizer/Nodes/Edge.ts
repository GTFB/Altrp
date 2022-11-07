import BaseNode from 'App/Customizer/Nodes/BaseNode'


export default class Edge extends BaseNode
{
  getTargetNode():BaseNode | null{
    return this.customizer?.parsed_data.find(c=>c.data.id && c.data.id == this.data.target) || null
  }
}
