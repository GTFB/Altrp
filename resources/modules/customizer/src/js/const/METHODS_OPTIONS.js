import COLLECTION_OPTIONS from "./methods-options/COLLECTION_OPTIONS";
import RESPONSE_OPTIONS from "./methods-options/RESPONSE_OPTIONS";
import REQUEST_OPTIONS from "./methods-options/REQUEST_OPTIONS";
import USER_OPTIONS from "./methods-options/USER_OPTIONS";
import MODEL_OPTIONS from "./methods-options/MODEL_OPTIONS";
import ELOQUENT_COLLECTION_OPTIONS from "./methods-options/ELOQUENT_COLLECTION_OPTIONS";
import BUILDER_OPTIONS from "./methods-options/BUILDER_OPTIONS";

const METHODS_OPTIONS =  [
  {
    value: '',
    label: 'None',
  },
  ...USER_OPTIONS,
  ...REQUEST_OPTIONS,
  ...RESPONSE_OPTIONS,
  ...COLLECTION_OPTIONS,
  ...MODEL_OPTIONS,
  ...ELOQUENT_COLLECTION_OPTIONS,
  ...BUILDER_OPTIONS,
];
export default METHODS_OPTIONS;
