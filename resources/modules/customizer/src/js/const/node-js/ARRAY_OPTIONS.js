import Parameter from "../../classes/Parameter";
import ANY from "../parameter-types/ANY";
import ARRAY from "../parameter-types/ARRAY";
import FUNCTION from "../parameter-types/FUNCTION";
import UNDEFINED from "../parameter-types/UNDEFINED";
import NUMBER from "../parameter-types/NUMBER";

const classDescription = `The Array object, as with arrays in other programming languages, enables storing a collection of multiple items under a single variable name, and has members for performing common array operations.`

const ARRAY_OPTIONS = [
  {
    value: 'array.map',
    objectInstance: 'array',
    label: 'map',
    description: 'The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.',
    classDescription,
    returns: [
      ARRAY,
    ],
    parameters:[
      new Parameter({
        name: 'callback',
        types:[
          FUNCTION,
        ],
        required: true,
      }),
      new Parameter({
        name: 'thisArg',
        types:[
          ANY,
        ],
      }),
    ],
  },
  {
    value: 'array.forEach',
    objectInstance: 'array',
    label: 'forEach',
    description: 'The forEach() method executes a provided function once for each array element.',
    classDescription,
    returns: [
      UNDEFINED,
    ],
    parameters:[
      new Parameter({
        name: 'callback',
        types:[
          FUNCTION,
        ],
        required: true,
      }),
      new Parameter({
        name: 'thisArg',
        types:[
          ...ANY,
        ],
      }),
    ],
  },
  {
    value: 'array.pop',
    objectInstance: 'array',
    label: 'pop',
    description: ' The pop() method removes the last element from an array and returns that element. This method changes the length of the array.',
    classDescription,
    returns: [
      ...ANY,
    ],
    parameters:[],
  },
  {
    value: 'array.push',
    objectInstance: 'array',
    label: 'push',
    description: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.',
    classDescription,
    returns: [
      ...ANY,
    ],
    parameters:[],
  },
  {
    value: 'array.reverse',
    objectInstance: 'array',
    label: 'reverse',
    description: 'The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.',
    classDescription,
    returns: [
      ARRAY,
    ],
    parameters:[],
  },
  {
    value: 'array.shift',
    objectInstance: 'array',
    label: 'shift',
    description: 'The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.',
    classDescription,
    returns: [
      ...ANY,
    ],
    parameters:[],
  },
  {
    value: 'array.unshift',
    objectInstance: 'array',
    label: 'unshift',
    description: 'The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.',
    classDescription,
    returns: [
      ...ANY,
    ],
    parameters:[],
  },
  {
    value: 'array.slice',
    objectInstance: 'array',
    label: 'slice',
    description: 'The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.',
    classDescription,
    returns: [
      ARRAY,
    ],
    parameters:[
      new Parameter({
        name: 'start',
        types:[
          NUMBER,
        ],
      }),
      new Parameter({
        name: 'end',
        types:[
          NUMBER,
        ],
      }),
    ],
  },
  {
    value: 'array.splice',
    objectInstance: 'array',
    label: 'splice',
    description: 'The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. To access part of an array without modifying it, see slice().',
    classDescription,
    returns: [
      ...ANY,
    ],
    parameters:[
      new Parameter({
        name: 'start',
        types:[
          NUMBER,
        ],
        required:true,
      }),
      new Parameter({
        name: 'deleteCount',
        types:[
          NUMBER,
        ],
      }),
      new Parameter({
        name: 'item',
        types:[
          ...ANY,
        ],
      }),
    ],
  },
];

export default ARRAY_OPTIONS
