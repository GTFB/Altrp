import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import NUMBER from "../parameter-types/NUMBER";

const classDescription = `You can interact with sessions by using the ctx.session property.`

const SESSION_OPTIONS = [
  {
    value: 'session.get',
    objectInstance: 'session',
    label: 'get',
    description: 'Read the value for a given key from the session store. Optionally, you can define a default value to return when the actual value is undefined or null.',
    classDescription,
    returns: [ANY],
    parameters:[
      new Parameter({
        name: "key",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "default",
        types: [...ANY],
      }),
    ],
  },
  {
    value: 'session.put',
    objectInstance: 'session',
    label: 'put',
    description: 'Write a key-value pair to the session store. The value should be one of the cookie supported data types .',
    classDescription,
    parameters:[
      new Parameter({
        name: "key",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [STRING, NUMBER],
      }),
    ],
  },
  {
    value: 'session.all',
    objectInstance: 'session',
    label: 'all',
    description: 'Read everything from the session store. Will always be an object of a key-value pair.',
    classDescription,
    returns: [STRING, NUMBER],
    parameters:[
    ],
  },
  {
    value: 'session.forget',
    objectInstance: 'session',
    label: 'forget',
    description: 'Remove value for a given key from the session store.',
    classDescription,
    returns: [STRING, NUMBER],
    parameters:[
      new Parameter({
        name: "key",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'session.increment',
    objectInstance: 'session',
    label: 'increment',
    description: 'Increment the value for a given key. Make sure the original value is always a number. Calling increment on a non-numeric value will result in an exception.',
    classDescription,
    returns: [],
    parameters:[
      new Parameter({
        name: "key",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'session.decrement',
    objectInstance: 'session',
    label: 'decrement',
    description: 'Decrement the value for a given key. Make sure the original value is always a number. Calling decrement on a non-numeric value will result in an exception.',
    classDescription,
    returns: [],
    parameters:[
      new Parameter({
        name: "key",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'session.clear',
    objectInstance: 'session',
    label: 'clear',
    description: 'Clear the session store to an empty state.',
    classDescription,
    returns: [],
    parameters:[
    ],
  },
]
export default SESSION_OPTIONS

