/**
 * Обработка запроса, чтобы работали фильтры и сортировка
 */
import {RequestContract} from "@ioc:Adonis/Core/Request"
import after from "./string/after"
import before from "./string/before"
import Database from "@ioc:Adonis/Lucid/Database";
import _ from "lodash";

async function selectForSQLEditor( sql:string, bindings,  request:RequestContract ){
  let _sql_order_by = ''
  let _sql_and_filters = ''
  let _sql_filters = ''
  let _sql_detail_filters = ''
  let _sql_detail_and_filters = ''
  const qs = request.qs()
  if( qs.filters ){
    let _filters = JSON.parse(qs.filters)

    if( sql.indexOf('ALTRP_FILTERS' ) !== -1 ){
      _sql_filters = 'WHERE'
      for(let key in _filters){
        if(_filters.hasOwnProperty(key)){
          const value = _filters[key]
          _sql_filters += ' AND `' +  key + '` LIKE "%' +  value + '%" '
        }
      }
    }
    if( sql.indexOf('ALTRP_AND_FILTERS') !== -1 ) {
      _sql_and_filters = ''
      for(let key in _filters){
        if(_filters.hasOwnProperty(key)){
          const value = _filters[key]
          _sql_filters += ' AND `' +  key + '` LIKE "%' +  value + '%" '
        }
      }
    }
    if( sql.indexOf('ALTRP_DETAIL_FILTERS') !== -1 ) {
      let _detail_filter_params = getDetailQueryValues(sql, 'ALTRP_DETAIL_FILTERS')

      let _detail_filter_conditionals:string[] = []
      for(let key in _filters){
        if(_filters.hasOwnProperty(key)){
          let value = _filters[key]

          if(_detail_filter_params[key]) {
            _detail_filter_params[key] = _detail_filter_params[key].replace(/\./g, "`.`")
            _detail_filter_conditionals.push(' `' +  _detail_filter_params[key] + '` LIKE "%' +  value + '%" ')
          }
        }
      }


      if(_detail_filter_conditionals.length > 0) {
        _sql_detail_filters = " WHERE "
      }

      _sql_detail_filters += _detail_filter_conditionals.join(' AND ')
    }
    if(  sql.indexOf('ALTRP_DETAIL_AND_FILTERS') !== -1 ) {
      let _detail_and_filter_params = getDetailQueryValues(sql, 'ALTRP_DETAIL_AND_FILTERS')

      let _detail_and_filter_conditionals:string[] = []

      for(let key in _filters){
        if(_filters.hasOwnProperty(key)){
          let value = _filters[key]
          if(_detail_and_filter_params[key]) {
            _detail_and_filter_params[key] = _detail_and_filter_params[key].replace(/\./g, "`.`")
            _detail_and_filter_conditionals.push( ' `' +  _detail_and_filter_params[key] + '` LIKE "%' +  value + '%" ')
          }
        }
      }


      if(_detail_and_filter_conditionals.length > 0) {
        _sql_detail_and_filters = " AND "
      }

      _sql_detail_and_filters +=  _detail_and_filter_conditionals.join(' AND ')
    }
  }

  if( qs.order && qs.order_by ){

    _sql_order_by = ' ORDER BY `' +  qs.order_by + '`' +  ( qs.order === 'DESC' ? ' DESC' : ' ')

    if(  sql.indexOf( 'ALTRP_DETAIL_FILTERS' ) !== -1 ) {
      let _detail_filter_params = getDetailQueryValues(sql, 'ALTRP_DETAIL_FILTERS')

      if(_detail_filter_params[qs.order_by]) {
        _sql_order_by = ' ORDER BY ' +  _detail_filter_params[qs.order_by] + '' +  ( qs.order === 'DESC' ? ' DESC' : ' ')
      }
    }
    else if(sql.indexOf( 'ALTRP_DETAIL_AND_FILTERS' ) !== -1) {
      let _detail_and_filter_params = getDetailQueryValues(sql, 'ALTRP_DETAIL_AND_FILTERS')

      if(_detail_and_filter_params[qs.order_by]) {
        _sql_order_by = ' ORDER BY ' +  _detail_and_filter_params[qs.order_by] + '' +  ( qs.order === 'DESC' ? ' DESC' : ' ')
      }
    }

    sql += _sql_order_by
  }

  sql = sql.replace(/ALTRP_FILTERS/g, _sql_filters)
  sql = sql.replace(/ALTRP_AND_FILTERS/g,_sql_and_filters)
  sql = sql.replace(/'?(ALTRP_DETAIL_FILTERS)(:[a-z0-9_,.:]+)?'?/g, _sql_detail_filters)
  sql = sql.replace(/'?(ALTRP_DETAIL_AND_FILTERS)(:[a-z0-9_,.:]+)?'?/g, _sql_detail_and_filters)

  let _result = await Database.rawQuery(convertShortcodes(sql, qs), bindings)
  if(_.isArray(_.get(_result, '0',))){
    _result = _.get(_result, '0',)
  }

  let result = _result.hasOwnProperty('rows') ? _result.rows : _result

  return bindings.hasOwnProperty('is_object') && bindings.is_object === 'true' ? result[0] : result

}
export default selectForSQLEditor


export function convertShortcodes(sql:string, qs:any):string {

  let pos1 = 0;
  let pos2 = 0;
  let _sql = sql

  while (true) {
    let openPos = sql.indexOf('{{', pos1);
    if (openPos == -1) break;
    let closePos = sql.indexOf('}}', pos2);
    if (closePos == -1) break;

    let shortCode = sql.slice(openPos, closePos+2);
    let code = sql.slice(openPos+2, closePos);

    if(code.indexOf( 'IF_AND_REQUEST' ) !== -1) {
      _sql = _sql.replace(shortCode, replaceIfAndRequest(code, qs))
    }

    if(code.indexOf( 'IS_NULL' ) !== -1) {
      _sql = _sql.replace(shortCode, replaceIsNull(code, qs))
    }

    // continue from the following position
    pos1 = openPos + 1;
    pos2 = closePos + 1;
  }
  return _sql;
}


export function replaceIfAndRequest(code:string, qs:any):string {

  let query = ``
  let args = code.split(':');
  let arg1 = args[1].trim();
  let arg2 = args[2].trim();
  let arg3 = args[3] ? args[3].trim() : '=';

  if (qs[arg2] && typeof qs[arg2] !== 'undefined') {
    let searchable = qs[arg2];
    switch (arg3) {
      case 'IN':
      case 'NOT IN':
      case 'NOT_IN':
        if (typeof qs[arg2] === 'string') {
          searchable = qs[arg2].replace(/\[|\]/g, '');
        }
        if (Array.isArray(qs[arg2])) {
          searchable = qs[arg2].toString();
        }
        query = ` AND ${arg1} ${arg3 == 'IN' ? arg3 : 'NOT IN'} (${searchable}) `;
        break;
      case 'LIKE':
      case 'ILIKE':
        searchable = `'%${qs[arg2]}%'`;
        query = ` AND ${arg1} ${arg3} ${searchable} `;
        break;
      case 'START_LIKE':
        searchable = `'%${qs[arg2]}'`;
        query = ` AND ${arg1} LIKE ${searchable} `;
        break;
      case 'END_LIKE':
        searchable = `'${qs[arg2]}%'`;
        query = ` AND ${arg1} LIKE ${searchable} `;
        break;
      default:
        query = ` AND ${arg1} ${arg3} '${qs[arg2]}' `;
    }
  }
  return query;
}


export function replaceIsNull(code:string, qs:any):string {
  let args = code.split(':');
  let arg1 = args[1].trim();
  return typeof qs[arg1] !== 'undefined' ? ` false ` : ` true `;
}


export function getDetailQueryValues(query, filter:string):object {

  filter += ":"

  let _detail_filter = after(query, filter)

  _detail_filter = before(_detail_filter, ' ')

  let _detail_filter_array = _detail_filter.split(':')
  let _detail_filter_params = {}
  for(let param of _detail_filter_array) {
    let line = param.split(',')
    _detail_filter_params[line[0]] = line[1]
  }

  return _detail_filter_params
}
