import THIS from "../parameter-types/THIS";
import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import OBJECT from "../parameter-types/OBJECT";
import ANY from "../parameter-types/ANY";

const classDescription = 'The instance of the request class holds data for the current HTTP request including the request body, uploaded files, cookies and much more.\n' +
  '\n' +
  'You can access the request object from the HTTP context passed to the route handler, middleware, and exception handler.'

const REQUEST_OPTIONS = [
  {
    value: 'request.all',
    objectInstance: 'request',
    label: 'all',
    description: 'Also, you can use the request.all method. It returns a merged copy of the request body and the request query string.',
    classDescription,
    returns: [
      OBJECT,
    ],
    parameters:[
    ],
  },
  {
    value: 'request.body',
    objectInstance: 'request',
    label: 'body',
    description: 'You can access the request body using the request.body method.',
    classDescription,
    returns: [
      OBJECT,
    ],
    parameters:[
    ],
  },
  {
    value: 'request.input',
    objectInstance: 'request',
    label: 'input',
    description: 'You can use the request.input method to read value for a single input field. The method also supports reading nested values using a dot notation.',
    classDescription,
    returns: [
      ...ANY,
    ],
    parameters:[
      new Parameter({
        name: "path",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'request.qs',
    objectInstance: 'request',
    label: 'qs',
    description: 'The parsed query string can be accessed using the request.qs() method.',
    classDescription,
    returns: [
      OBJECT,
    ],
    parameters:[
    ],
  },
];

export default REQUEST_OPTIONS
