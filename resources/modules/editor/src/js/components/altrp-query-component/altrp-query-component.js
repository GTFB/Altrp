import React from "react";
import Query from "../../classes/Query";
import {useQuery, usePaginatedQuery, queryCache} from  "react-query";

/**
 * Компонент для получения данных при помощи  Rect Query
 * @param {{
 *  children: array,
 *  data: array,
 *  query: {Query}
 * }} props
 * @return {React.Component}
 * @constructor
 */
const AltrpQueryComponent = (props)=>{
  let {children = [], query, data} = props;
  if(! _.isArray(children)){
    children = [children];
  }
  if(! _.isEmpty(data)){

  }
  return children.map(child => React.cloneElement(child, {...props, data, key:child.key}));

};

export default AltrpQueryComponent