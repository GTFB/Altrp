import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import FUNCTION from "../parameter-types/FUNCTION";
import ARRAY from "../parameter-types/ARRAY";
import NULL from "../parameter-types/NULL";
import BOOL from "../parameter-types/BOOL";
import INT from "../parameter-types/INT";

const classDescription = "class Collection implements ArrayAccess, Enumerable (View source)"

const COLLECTION_OPTIONS = [
  {
    value: 'Collection.get',
    objectInstance: 'Collection',
    label: 'get',
    returns: ANY,
    classDescription,
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
    classDescription,
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
    classDescription,
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
    classDescription,
    parameters:[
    ],
  },
  {
    value: 'Collection.toArray',
    objectInstance: 'Collection',
    label: 'toArray',
    description: 'Get the collection of items as a plain array.',
    classDescription,
    returns: [ARRAY],
    parameters:[
    ],
  },
  {
    value: 'Collection.toJson',
    objectInstance: 'Collection',
    label: 'toJson',
    description: 'Get the collection of items as JSON.',
    classDescription,
    returns: [STRING],
    parameters:[
      new Parameter({
        name: 'options',
        types: [INT],
        required: false,
      }),
    ],
  },
  {
    value: 'Collection.map',
    objectInstance: 'Collection',
    label: 'map',
    description: 'Run a map over each of the items.',
    classDescription,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'callback',
        types: [FUNCTION],
        required: true,
      }),
    ],
  },
  {
    value: 'Collection.filter',
    objectInstance: 'Collection',
    label: 'filter',
    description: 'Run a filter over each of the items.',
    classDescription,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'callback',
        types: [FUNCTION],
        required: false,
      }),
    ],
  },
  {
    value: 'Collection.first',
    objectInstance: 'Collection',
    label: 'first',
    description: 'Get the first item from the collection passing the given truth test.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: 'callback',
        types: [FUNCTION],
        required: false,
      }),
      new Parameter({
        name: 'default',
        types: ANY,
        required: false,
      }),
    ],
  },
  {
    value: 'Collection.count',
    objectInstance: 'Collection',
    label: 'count',
    description: 'Count the number of items in the collection.',
    classDescription,
    returns: [INT],
    parameters:[
    ],
  },
  {
    value: 'Collection.isNotEmpty',
    objectInstance: 'Collection',
    label: 'isNotEmpty',
    description: 'Determine if the collection is not empty.',
    classDescription,
    returns: [BOOL],
    parameters:[
    ],
  },
  {
    value: 'Collection.isEmpty',
    objectInstance: 'Collection',
    label: 'isEmpty',
    description: 'Determine if the collection is empty or not.',
    classDescription,
    returns: [BOOL],
    parameters:[
    ],
  },
  {
    value: 'Collection.keys',
    objectInstance: 'Collection',
    label: 'keys',
    description: 'Get the keys of the collection items.',
    classDescription,
    returns: [ARRAY],
    parameters:[
    ],
  },
  {
    value: 'Collection.median',
    objectInstance: 'Collection',
    label: 'median',
    description: 'Get the median of a given key.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING, ARRAY, NULL],
        required: false,
      }),
    ],
  },
  {
    value: 'Collection.forPage',
    objectInstance: 'Collection',
    label: 'forPage',
    description: '"Paginate" the collection by slicing it into a smaller collection.',
    classDescription,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'page',
        types: [INT],
        required: true,
      }),
      new Parameter({
        name: 'perPage',
        types: [INT],
        required: true,
      }),
    ],
  },
  {
    value: 'Collection.sum',
    objectInstance: 'Collection',
    label: 'sum',
    description: 'Get the sum of the given values.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: 'callback',
        types: [FUNCTION, STRING, NULL],
        required: false,
      }),
    ],
  }
];

export default COLLECTION_OPTIONS
