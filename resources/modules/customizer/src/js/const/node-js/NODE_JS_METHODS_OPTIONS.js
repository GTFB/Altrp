import RESPONSE_OPTIONS from "./RESPONSE_OPTIONS";
import REQUEST_OPTIONS from "./REQUEST_OPTIONS";
import SESSION_OPTIONS from "./SESSION_OPTIONS";


const JS_METHODS_OPTIONS = [
  {
    value: '',
    label: 'None',
  },
  ...REQUEST_OPTIONS,
  ...RESPONSE_OPTIONS,
  ...SESSION_OPTIONS,
]
export default JS_METHODS_OPTIONS
