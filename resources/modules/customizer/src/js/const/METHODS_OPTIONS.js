import COLLECTION_OPTIONS from "./methods-options/COLLECTION_OPTIONS";
import RESPONSE_OPTIONS from "./methods-options/RESPONSE_OPTIONS";
import REQUEST_OPTIONS from "./methods-options/REQUEST_OPTIONS";
import USER_OPTIONS from "./methods-options/USER_OPTIONS";
import SESSION_OPTIONS from "./methods-options/SESSION_OPTIONS";

const METHODS_OPTIONS =  [
  {
    value: '',
    label: 'None',
  },
  ...USER_OPTIONS,
  ...REQUEST_OPTIONS,
  ...RESPONSE_OPTIONS,
  ...COLLECTION_OPTIONS,
];
export default METHODS_OPTIONS;
