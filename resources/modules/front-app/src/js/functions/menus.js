import Resource from "../../../../editor/src/js/classes/Resource";

/**
 *
 * @param guid
 * @return {Promise<{}>}
 */
export async function getMenuByGUID(guid = ''){
  if(! guid){
    return null;
  }
  const resource = new Resource({route: '/ajax/menus'})
  let data = await resource.get(guid);
  return data;
}
