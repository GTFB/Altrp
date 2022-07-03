import MobileDetect from 'mobile-detect'
import {RequestContract} from "@ioc:Adonis/Core/Request";


export default function getCurrentDevice(request: RequestContract):string {
  let {__altrp_current_device} = request.cookiesList()

  if( __altrp_current_device){
    return __altrp_current_device
  }

  // @ts-ignore
  const detector = new MobileDetect(request.header('user-agent') );
  if(detector.tablet()){
    return 'Tablet';
  }
  if(detector.phone() || detector.mobile()){
    return 'Big-Phone';
  }
  return'DEFAULT_BREAKPOINT';
}
