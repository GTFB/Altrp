import BaseNode from 'App/Customizer/Nodes/BaseNode';
import NodeInterface from 'App/Customizer/Nodes/NodeInterface';
import data_get from '../../../helpers/data_get';
import * as _ from 'lodash';

export default class DefaultNode extends BaseNode implements NodeInterface {
  public getChildren(): [] {
    // TODO: Implement getChildren() method.
    return [];
  }
  public getContent(): string {
    // TODO: Implement getContent() method.
    return '';
  }
  parseCustomizerData(data): boolean {
    // TODO: Implement parseData() method.
    if (!data) {
      data = [];
    }
    this.data = data.find((item) => {
      return data_get(item, 'type') === 'start';
    });
    return true;
  }

  /**
   * парсим  массив в строку
   * @return string
   */
  public parseArray(data = []) {
    let JSContent = '';
    for (let item of data) {
      let _JSContent = data_get(item, 'JSContent');
      if (!_.isString(JSContent) || !JSContent) {
        continue;
      }

      // preg_match_all('/{{([\s\S]+?)(?=}})/', _JSContent, matches)
      // if( ! isset( matches ) || ! isset( matches[1] )){
      //   JSContent += _JSContent
      //   continue
      // }
      // matches = matches[1]
      //
      // foreach (matches as path) {
      //   item = data_get( item, path)
      //   if(is_array( item ) && isset(item[0]) ){
      //     item = this.parseArray(item)
      //   } elseif ( is_array( item ) ) {
      //     item = this.parseObject(item)
      //   }
      //   _JSContent = str_replace(`{{${path}}}`, item, _JSContent)
      //
      // }
      JSContent += _JSContent;
    }
    return JSContent;
  }

  /**
   * парсим ассоциативный массив в строку
   * @return string
   */
  public parseObject(item) {
    let JSContent = data_get(item, 'JSContent');
    if (!_.isString(JSContent) || !JSContent) {
      return '';
    }
    // preg_match_all('/{{([\s\S]+?)(?=}})/', JSContent, matches)
    // if( ! isset( matches ) || ! isset( matches[1] )){
    //   return JSContent
    // }
    // matches = matches[1]
    //
    // foreach (matches as path) {
    //   item = data_get( item, path )
    //   if(is_array( item ) && isset(item[0]) ){
    //     item = this.parseArray(item)
    //
    //   } elseif ( is_array( item ) ){
    //     item = this.parseObject(item)
    //   }
    //   JSContent = str_replace(`{{${path}}}`, item, JSContent)
    // }
    return JSContent;
  }

  /**
   * Если тип ноды отсутствует на бэкенде, то в нем должно быть свойство JSContent,
   * которое является шаблоном js-кода
   * @return string
   */
  public getJSContent(): string {
    return this.parseObject(this.data);
  }
}
