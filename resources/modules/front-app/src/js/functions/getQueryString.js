import qs, {QueryString} from "qs";

/**
 *
 * @returns {QueryString.ParsedQs}
 */
export default function getQueryString(){
  return qs.parse(location.search.replace('?',''))
}
