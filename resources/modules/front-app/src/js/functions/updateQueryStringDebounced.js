import updateQueryString from "./updateQueryString";
/**
 *
 * @param paramName{string}
 * @param paramValue{any}
 */
const updateQueryStringDebounced = (paramName, paramValue) =>{
  console.log(paramName, paramValue);
  return _.debounce(updateQueryString, 450)(paramName, paramValue)
}

export default updateQueryStringDebounced
