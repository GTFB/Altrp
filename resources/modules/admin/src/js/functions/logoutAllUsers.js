import Resource from "../../../../editor/src/js/classes/Resource";
import progressBar from "./progressBar";
import restartAltrp from "./restartAltrp";
import {pageReload} from "../helpers";

export default async function logoutAllUsers(){
  if(!confirm('Are You Sures?')){
    return
  }
  if(!confirm('After confirm this action, the server will reboot and the current session will end. Are you sure you want to continue?')){
    return
  }
  progressBar(0.01)
  await (new Resource({route:'/admin/ajax/all_logout'})).post({})
  progressBar(0.5)
  await restartAltrp()
  progressBar(1)
  pageReload()
}
