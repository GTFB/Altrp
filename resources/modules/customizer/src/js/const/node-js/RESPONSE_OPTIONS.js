import THIS from "../parameter-types/THIS";
import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import FUNCTION from "../parameter-types/FUNCTION";
import STREAM from "../parameter-types/STREAM";
import BOOL from "../parameter-types/BOOL";
import ANY from "../parameter-types/ANY";
import NUMBER from "../parameter-types/NUMBER";

const classDescription = 'Following are the methods to work with the response headers and the response status.'

const RESPONSE_OPTIONS = [
  {
    value: 'response.header',
    objectInstance: 'response',
    label: 'header',
    description: 'The response.header method defines the HTTP response header. Using this method overwrites the existing header (if any).',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "headerKey",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "headerValue",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'response.removeHeader',
    objectInstance: 'response',
    label: 'removeHeader',
    description: 'The response.removeHeader allows removing an existing response header.',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "headerKey",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'response.getHeader',
    objectInstance: 'response',
    label: 'getHeader',
    description: 'The response.getHeader method returns the value of an existing header.',
    classDescription,
    returns: [
      STRING,
    ],
    parameters:[
      new Parameter({
        name: "headerKey",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'response.stream',
    objectInstance: 'response',
    label: 'stream',
    description: 'The response.stream method allows piping the stream to the response. This method does not set the content-type and the content-length headers, and you will have to set them manually. In the case of errors, A 500 response is sent to the client. However, you can send a custom status code and message by defining a callback. The callback must return an array with the response message and the response status code.',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "stream",
        types: [STREAM],
        required: true,
      }),
      new Parameter({
        name: "errorCallback",
        types: [FUNCTION],
      }),
    ],
  },
  {
    value: 'response.download',
    objectInstance: 'response',
    label: 'download',
    description: 'The download method streams the file to the client by reading it from the disk. However, unlike the stream method, the download method does set the content-type and the content-length headers.',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "filePath",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "eTag",
        types: [BOOL ],
        required: true,
      }),
      new Parameter({
        name: "errorCallback",
        types: [FUNCTION],
      }),
    ],
  },
  {
    value: 'response.redirect',
    objectInstance: 'response',
    label: 'redirect',
    description: 'Redirect',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "location",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "eTag",
        types: [BOOL ],
        required: true,
      }),
      new Parameter({
        name: "errorCallback",
        types: [FUNCTION],
      }),
    ],
  },
  {
    value: 'response.send',
    objectInstance: 'response',
    label: 'send',
    description: 'Send response',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "body",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'response.json',
    objectInstance: 'response',
    label: 'json',
    description: 'Send JSON response',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "data",
        types: [ANY],
        required: true,
      }),
    ],
  },
  {
    value: 'response.status',
    objectInstance: 'response',
    label: 'status',
    description: 'Set HTTP status code',
    classDescription,
    returns: [
      THIS,
    ],
    parameters:[
      new Parameter({
        name: "code",
        types: [NUMBER],
        required: true,
      }),
    ],
  },
];

export default RESPONSE_OPTIONS
