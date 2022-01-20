import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"
import * as _ from "lodash"

export default class DefaultNode extends BaseNode implements NodeInterface
{
  public data = null



  public getChildren(): []
  {
    // TODO: Implement getChildren() method.
    return []
  }
  public getContent(): string
  {
    // TODO: Implement getContent() method.
    return ''
  }
  parseCustomizerData( data  ): boolean
  {
    // TODO: Implement parseData() method.
    if( ! data ) {
      data = []
    }
    this.data = data.find( ( item )=> {
      return data_get( item, 'type' ) === 'start'
    })
    return true
  }


  /**
   * парсим  массив в строку
   * @return string
   */
  public parseArray(data = []){
    let js_content = ''
    for (let item of data){
      let _js_content = data_get( item, 'js_content' )
      if( ! _.isString(js_content) || ! js_content ) {
        continue
      }

      preg_match_all('/{{([\s\S]+?)(?=}})/', _js_content, matches)
      if( ! isset( matches ) || ! isset( matches[1] )){
        js_content += _js_content
        continue
      }
      matches = matches[1]

      foreach (matches as path) {
        item = data_get( item, path)
        if(is_array( item ) && isset(item[0]) ){
          item = this.parseArray(item)
        } elseif ( is_array( item ) ) {
          item = this.parseObject(item)
        }
        _js_content = str_replace('{{{path}}}', item, _js_content)

      }
      js_content += _js_content
    }
    return js_content
  }

  /**
   * парсим ассоциативный массив в строку
   * @return string
   */
  public parseObject( item ){
    js_content = data_get( item, 'js_content' )
    if( ! _.isString(js_content) || ! js_content ) {
      return ''
    }
    preg_match_all('/{{([\s\S]+?)(?=}})/', js_content, matches)
    if( ! isset( matches ) || ! isset( matches[1] )){
      return js_content
    }
    matches = matches[1]

    foreach (matches as path) {
      item = data_get( item, path )
      if(is_array( item ) && isset(item[0]) ){
        item = this.parseArray(item)

      } elseif ( is_array( item ) ){
        item = this.parseObject(item)
      }
      js_content = str_replace('{{{path}}}', item, js_content)
    }
    return js_content
  }

  /**
   * Если тип ноды отсутствует на бэкенде, то в нем должно быть свойство js_content,
   * которое является шаблоном js-кода
   * @return string
   */
  public getJSContent(): string
  {
    return this.parseObject( this.data )
  }
}
