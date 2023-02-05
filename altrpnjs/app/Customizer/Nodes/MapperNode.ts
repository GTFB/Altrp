import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"


export default class MapperNode extends BaseNode implements NodeInterface
{

  public getContent(): string
  {
    console.log(this);
    console.log(this.getChildren());
    return ''
  }

  public getJSContent(): string
  {


    const {
      source = '',
      store = ''
    } = this.data.data;

    // console.log(this.customizer.parsed_data);
    const edges = BaseNode.getEdgesBySourceId(this.data.id, this.customizer.parsed_data)
    //const children = BaseNode.getChildrenBySourceId(this.data.id, this.customizer.parsed_data)

    let bodyChild = edges.find(e=>{
      return e.data.sourceHandle === 'body'
    })
    if(bodyChild){
      bodyChild = this.customizer.parsed_data.find(c=>{
        // @ts-ignore
        return c.data.id === bodyChild.data.target
      })
    }
    let body = ''

    if(bodyChild){
      body = bodyChild.getJSContent()
    }
    let afterChild = edges.find(e=>{
      return e.data.sourceHandle === 'after'
    })

    if(afterChild){
      afterChild = this.customizer.parsed_data.find(c=>{
        // @ts-ignore
        return c.data.id === afterChild.data.target
      })
    }
    let after = ''
    if(afterChild){
      after = afterChild.getJSContent()
    }

    if(! source){
      return after
    }

    let result = `
      await Promise.all(_.map(this.getCustomizerData('context.${source}'),
        async (item, idx)=>{
          this.setCustomizerData('context.currentItem', item);
          this.setCustomizerData('context.currentIndex', idx);
            ${body}
        }
      ))
    `
    if(store){
      result = `
    this.setCustomizerData('context.${store}',
        ${result});
      `
    }
    return result
  }
}
