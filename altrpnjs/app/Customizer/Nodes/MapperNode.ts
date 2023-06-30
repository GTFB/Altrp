import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"


export default class MapperNode extends BaseNode implements NodeInterface
{

  public getContent(): string
  {
    // console.log(this);
    // console.log(this.getChildren());
    return ''
  }

  public getJSContent(): string
  {


    let {
      source = '',
      store = ''
    } = this.data.data;
    if(store.indexOf('context.') == 0){
      store = store.replace('context.', '')
    }
    if(source.indexOf('context.') == 0){
      source = source.replace('context.', '')
    }
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
    let result = ''
    if(store){
      result += `
    this.setCustomizerData('context.${store}', []);
    `
    }
     result += `

    for(const _idx in this.getCustomizerData('context.${source}', [])){
      if(this.getCustomizerData('context.${source}').hasOwnProperty(_idx)){
        this.setCustomizerData('context.currentItem', this.getCustomizerData('context.${source}')[_idx]);
        this.setCustomizerData('context.currentIndex', _idx);
        try{
          ${store ? `
          this.getCustomizerData('context.${store}').push(
          await (async ()=>{
              ${body}
          })()
          );` : `
          await (async ()=>{
              ${body}
          })()`}
        } catch(e){
          console.error(e)
        }
      }
    }

    `
    return result + after
  }
}
