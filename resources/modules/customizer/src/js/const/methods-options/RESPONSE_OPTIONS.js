import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import INT from "../parameter-types/INT";
import ARRAY from "../parameter-types/ARRAY";

const RESPONSE_OPTIONS = [
  {
    value: 'Response.json',
    objectInstance: 'Response',
    label: 'json',
    returns: ANY,
    parameters:[
      new Parameter({
        name: 'data',
        types: [
          ARRAY,
          STRING,
        ],
        required: true,
      }),
      new Parameter({
        name: 'status',
        types: [
          INT,
        ],
      }),
      new Parameter({
        name: 'headers',
        types: [
          ARRAY,
        ],
      }),
      new Parameter({
        name: 'options',
        types: [
          INT,
        ],
      }),
    ],
  },
];

export default RESPONSE_OPTIONS
