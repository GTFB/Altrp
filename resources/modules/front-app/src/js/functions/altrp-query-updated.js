import qs from "qs";
import {changeCurrentPage} from "../store/current-page/actions";

export  default function _updateAltrpPage(){

  let params = window?.__altrp_settings__?.page_params

  if (!params) {
    params = qs.parse(document?.location?.search.replace('?',''));
  }

  let hashParams = {};
  if (document?.location?.hash && document?.location?.hash.indexOf('=') !== -1) {
    hashParams = qs.parse(document?.location?.hash.replace('#', ''))
  }

  appStore.dispatch(changeCurrentPage({
    url: location?.href || "",
    title: window?.currentPage?.title || "",
    hash: document?.location?.hash,
    pathname:document?.location?.pathname,
    hashParams,
    params,
  }))
}

window.addEventListener('altrp-query-updated',_updateAltrpPage)
