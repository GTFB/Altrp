import MobileDetect from 'mobile-detect';
import { RequestContract } from '@ioc:Adonis/Core/Request';

export default function getCurrentDevice(request: RequestContract): string {
  if (request.cookie('__altrp_current_device')) {
    return request.cookie('__altrp_current_device');
  }

  // @ts-ignore
  const detector = new MobileDetect(request.header('user-agent'));
  if (detector.tablet()) {
    return 'Tablet';
  }
  if (detector.phone()) {
    return 'Small-Phone';
  }
  return 'DEFAULT_BREAKPOINT';
}
