import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import INT from "../parameter-types/INT";
import FUNCTION from "../parameter-types/FUNCTION";
import ARRAY from "../parameter-types/ARRAY";
import NULL from "../parameter-types/NULL";

const classDescription = '';
/**
 *
 * @type {[
 * {objectInstance: string,
 * returns: array,
 * label: string,
 * value: string,
 * description: string,
 * classDescription: string,
 * parameters: Parameter[]}]}
 */
const SESSION_OPTIONS = [
  {
    value: 'Session.all',
    objectInstance: 'Session',
    label: 'all',
    description: '',
    classDescription,
    returns: [
      ARRAY,
    ],
    parameters:[

    ],
  },
  {
    value: 'Session.getDefaultDriver',
    objectInstance: 'Session',
    label: 'getDefaultDriver',
    description: 'Get the default driver name.',
    classDescription,
    returns: [
      STRING,
    ],
    parameters:[

    ],
  },
  {
    value: 'Session.driver',
    objectInstance: 'Session',
    label: 'driver',
    description: 'Get a driver instance.',
    classDescription,
    returns: [
      {
        label: 'Illuminate\\Session\\Store',
        value: 'Illuminate\\Session\\Store',
      },
    ],
    parameters:[
      new Parameter({
        name: 'driver',
        types:[
          STRING,
          NULL,
        ],
      })
    ],
  },{
    value: 'Session.put',
    objectInstance: 'Session',
    label: 'put',
    description: 'Put a key / value pair or array of key / value pairs in the session.',
    classDescription,
    returns: [
    ],
    parameters:[
      new Parameter({
        name: 'key',
        types:[
          STRING,
          ARRAY,
        ],
        required: true,
      }),
      new Parameter({
        name: 'value',
        types: ANY,
      }),
    ],
  },{
    value: 'Session.remember',
    objectInstance: 'Session',
    label: 'remember',
    description: 'Get an item from the session, or store the default value.',
    classDescription,
    returns: [
    ],
    parameters:[
      new Parameter({
        name: 'key',
        types:[
          STRING,
        ],
        required: true,
      }),
      new Parameter({
        name: 'callback',
        types: [
          FUNCTION,
        ],
        required: true,
      }),
    ],
  },{
    value: 'Session.push',
    objectInstance: 'Session',
    label: 'push',
    description: 'Push a value onto a session array.',
    classDescription,
    returns: [
    ],
    parameters:[
      new Parameter({
        name: 'key',
        types:[
          STRING,
        ],
        required: true,
      }),
      new Parameter({
        name: 'value',
        types: [
          ANY,
        ],
        required: true,
      }),
    ],
  },{
    value: 'Session.increment',
    objectInstance: 'Session',
    label: 'increment',
    description: 'Increment the value of an item in the session.',
    classDescription,
    returns:  [
      INT,
    ],
    parameters:[
      new Parameter({
        name: 'key',
        types:[
          STRING,
        ],
        required: true,
      }),
      new Parameter({
        name: 'amount',
        types: [
          INT,
        ],
      }),
    ],
  },{
    value: 'Session.decrement',
    objectInstance: 'Session',
    label: 'decrement',
    description: 'Decrement the value of an item in the session.',
    classDescription,
    returns:  [
      INT,
    ],
    parameters:[
      new Parameter({
        name: 'key',
        types:[
          STRING,
        ],
        required: true,
      }),
      new Parameter({
        name: 'amount',
        types: [
          INT,
        ],
      }),
    ],
  },{
    value: 'Session.flash',
    objectInstance: 'Session',
    label: 'flash',
    description: 'Flash a key / value pair to the session.',
    classDescription,
    returns:  [
    ],
    parameters:[
      new Parameter({
        name: 'key',
        types:[
          STRING,
        ],
        required: true,
      }),
      new Parameter({
        name: 'value',
        types: ANY,
        required: true,
      }),
    ],
  },{
    value: 'Session.reflash',
    objectInstance: 'Session',
    label: 'reflash',
    description: 'Reflash all of the session flash data.',
    classDescription,
    returns:  [
    ],
    parameters:[
    ],
  },{
    value: 'Session.remove',
    objectInstance: 'Session',
    label: 'remove',
    description: 'Remove an item from the session, returning its value.',
    classDescription,
    returns:  [
      ...ANY
    ],
    parameters:[
      new Parameter({
        name: 'key',
        types:[
          STRING,
        ],
        required: true,
      }),
    ],
  },{
    value: 'Session.forget',
    objectInstance: 'Session',
    label: 'forget',
    description: 'Remove one or many items from the session.',
    classDescription,
    returns:  [
    ],
    parameters:[
      new Parameter({
        name: 'keys',
        types:[
          STRING,
          ARRAY,
        ],
        required: true,
      }),
    ],
  },{
    value: 'Session.flush',
    objectInstance: 'Session',
    label: 'flush',
    description: 'Remove all of the items from the session.',
    classDescription,
    returns:  [
    ],
    parameters:[
      new Parameter({
        name: 'flush',
        types:[
          STRING,
        ],
        required: true,
      }),
    ],
  },
];

export default SESSION_OPTIONS

