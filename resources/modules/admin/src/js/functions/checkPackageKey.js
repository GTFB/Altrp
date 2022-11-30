import isProd from "../helpers/isProd";
import Resource from "../../../../editor/src/js/classes/Resource"
export default async function checkPackageKey(){
  if(! isProd()){
    return
  }
  const resource = new Resource({route: '/admin/ajax/package_key'})
  let localPackageKey = localStorage.getItem('package_key') || ''
  let serverPackageKey
  try {
    serverPackageKey = await resource.getAll()
    serverPackageKey = serverPackageKey.package_key
  } catch (e) {
    console.error(e);
    return
  }
  if(serverPackageKey === localPackageKey){
    return
  }
  localStorage.setItem('package_key', serverPackageKey)
//   alert(`Altrp Updated!
// New Package Key Is:
// ${serverPackageKey}
//   `)
}
