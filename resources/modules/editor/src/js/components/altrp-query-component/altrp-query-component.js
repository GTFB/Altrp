import React, {useState, useCallback, useEffect} from "react";
import Query from "../../classes/Query";
import {useQuery, usePaginatedQuery, queryCache} from  "react-query";

/**
 * Компонент для получения данных при помощи запросов
 * @param {{
 *  children: array,
 *  data: array,
 *  query: {Query}
 * }} props
 * @return {React.Component}
 * @constructor
 */
const AltrpQueryComponent = (props)=>{
  let _data =[], _status, _error, _latestData;

  const useQuerySettings = {
    forceFetchOnMount: true,
    refetchOnWindowFocus: true,
  };

  let {children = [], query, data, settings} = props;
  /**
   * проверим есть ли настройки для сортировок по умолчанию
   */
  const defaultSortSettings =  {};
  settings.tables_columns.forEach(column => {
    if(column.column_is_default_sorted && !defaultSortSettings.order_by){
      defaultSortSettings.order_by = column.accessor;
      defaultSortSettings.order = _.get(column, 'column_is_default_sorted_direction', 'ASC')
    }
  });
  const [sortSetting, setSortSettings] = useState(defaultSortSettings);
  const [filterSetting, setFilterSettings] = useState({});
  const fetchModels = useCallback(async (key, page = 1, sortSetting, filterSetting, params,  groupBy) => {
    let queryData = {page};
    const filterSettingJSON = JSON.stringify(filterSetting);
    if(sortSetting){
      queryData = _.assign(sortSetting, queryData);
    }
    if(groupBy){
      queryData.order = 'ASC';
      queryData.order_by = groupBy;
    }
    if(filterSettingJSON.length > 2){
      queryData.filters = filterSettingJSON;
    }
    return query.getQueried(queryData)
  });

  if(query.pageSize){
    /**
     * Если есть пагинация
     */
    const {
      status,
      resolvedData,
      latestData,
      error,
    } = usePaginatedQuery([query.dataSourceName, page, sortSetting, filterSetting, query.getParams(), groupBy],
        fetchModels,
        useQuerySettings);
    _data = resolvedData ? resolvedData : _data;
    _status = status;
    _error = error;
    _latestData = latestData;
    useEffect(() => {
      if (latestData?.hasMore) {
        queryCache.prefetchQuery([query.dataSourceName, page + 1], fetchModels);
      }
    }, [latestData, fetchModels, page, sortSetting, filterSetting]);
  }else {
    /**
     * Если нет пагинации
     */
    const {status, data, error,} = useQuery([query.dataSourceName,query.getParams()],
        () => {
          return query.getResource().getQueried({...sortSetting,filters: filterSettingJSON, groupBy})
        }, useQuerySettings);
    _data = data;
    _status = status;
    _error = error;
  }
  if(_.isObject(_data) && ! _.isArray(_data)){
    _data = [_data];
  }
  if(! _data.length){
    _data = data;
  }

  if(! _.isArray(children)){
    children = [children];
  }

  if(_.isEmpty(data)){
    data = _data
  }
  const childrenProps = {...props,
    data,
    _status,
    setFilterSettings,
    setSortSettings,
    filterSetting,
    sortSetting,
    _error};
  return children.map(child => React.cloneElement(child, {...childrenProps, key:child.key}));

};

export default AltrpQueryComponent