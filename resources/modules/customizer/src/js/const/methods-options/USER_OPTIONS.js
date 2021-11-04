import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import INT from "../parameter-types/INT";
import ARRAY from "../parameter-types/ARRAY";
import BOOL from "../parameter-types/BOOL";

const USER_OPTIONS = [
  {
    value: 'User.isAdmin',
    objectInstance: 'User',
    label: 'isAdmin',
    description: 'Check User is Administrator',
    returns: BOOL,
    parameters:[
    ],
  },
];

export default USER_OPTIONS
