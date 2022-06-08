import THIS from "../parameter-types/THIS";
import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import OBJECT from "../parameter-types/OBJECT";
import ANY from "../parameter-types/ANY";
import NUMBER from "../parameter-types/NUMBER";
import ARRAY from "../parameter-types/ARRAY";
import REGULAR_EXPrESSION from "../parameter-types/REGULAR_EXPRESSION";
import REGULAR_EXPRESSION from "../parameter-types/REGULAR_EXPRESSION";

const classDescription = 'The instance of the request class holds data for the current HTTP request including the request body, uploaded files, cookies and much more.\n' +
  '\n' +
  'You can access the request object from the HTTP context passed to the route handler, middleware, and exception handler.'

const STRING_OPTIONS = [
  {
    value: 'string.charAt',
    objectInstance: 'string',
    label: 'charAt',
    description: 'The String object\'s charAt() method returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string. ',
    classDescription,
    returns: [
      STRING,
    ],
    parameters:[
      new Parameter({
        name: "index",
        types: [NUMBER],
        required: true,
      }),
    ],
  },
  {
    value: 'string.match',
    objectInstance: 'string',
    label: 'match',
    description: 'The match() method retrieves the result of matching a string against a regular expression.',
    classDescription,
    returns: [
      ARRAY,
    ],
    parameters:[
      new Parameter({
        name: "regexp",
        types: [REGULAR_EXPRESSION],
        required: true,
      }),
    ],
  },
  {
    value: 'string.indexOf',
    objectInstance: 'string',
    label: 'indexOf',
    description: 'The indexOf() method, given one argument: a substring to search for, searches the entire calling string, and returns the index of the first occurrence of the specified substring. Given a second argument: a number, the method returns the first occurrence of the specified substring at an index greater than or equal to the specified number.',
    classDescription,
    returns: [
      NUMBER,
    ],
    parameters:[
      new Parameter({
        name: "searchString",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "position",
        types: [NUMBER],
      }),
    ],
  },
  {
    value: 'string.replace',
    objectInstance: 'string',
    label: 'replace',
    description: ' The replace() method returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match. If pattern is a string, only the first occurrence will be replaced. ',
    classDescription,
    returns: [
      ARRAY,
    ],
    parameters:[
      new Parameter({
        name: "regexp",
        types: [REGULAR_EXPRESSION],
        required: true,
      }),
      new Parameter({
        name: "substr",
        types: [STRING],
        required: true,
      }),
    ],
  },
];

export default STRING_OPTIONS
