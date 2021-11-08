import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";

const REQUEST_OPTIONS = [
  {
    value: 'Request.get',
    objectInstance: 'Request',
    label: 'get',
    returns: ANY,
    parameters:[
      new Parameter({
        name: 'key',
        types: [
          STRING,
        ],
        required: true,
      }),
      new Parameter({
        name: 'default',
        types: [
          ...ANY,
        ],
      }),
    ],
  },
];

export default REQUEST_OPTIONS
