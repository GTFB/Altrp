import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import FUNCTION from "../parameter-types/FUNCTION";
import ARRAY from "../parameter-types/ARRAY";
import NULL from "../parameter-types/NULL";

const COLLECTION_OPTIONS = [
  {
    value: 'Collection.get',
    objectInstance: 'Collection',
    label: 'get',
    returns: [ANY],
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
  {
    value: 'Collection.each',
    objectInstance: 'Collection',
    label: 'each',
    parameters:[
      new Parameter({
        name: 'callback',
        types: [
          FUNCTION,
        ],
        required: true,
      }),
    ],
  },
  {
    value: 'Collection.avg',
    objectInstance: 'Collection',
    description: 'Get the average value of a given key.',
    label: 'avg',
    parameters:[
      new Parameter({
        name: 'callback',
        types: [
          FUNCTION,
          STRING,
          NULL,
        ],
      }),
    ],
  },
  {
    value: 'Collection.all',
    objectInstance: 'Collection',
    returns: [ARRAY],
    description: 'Get all of the items in the collection.',
    label: 'all',
    parameters:[
    ],
  },
];

export default COLLECTION_OPTIONS
