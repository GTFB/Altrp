import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import BOOL from "../parameter-types/BOOL";

const classDescription = `The Object class represents one of JavaScript's data types. It is used to store various keyed collections and more complex entities. Objects can be created using the Object() constructor or the object initializer / literal syntax.`
const OBJECT_OPTIONS = [
  {
    value: 'object.hasOwnProperty',
    objectInstance: 'object',
    label: 'hasOwnProperty',
    description: ' The hasOwnProperty() method returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it). ',
    classDescription,
    returns: [
      BOOL,
    ],
    parameters:[
      new Parameter({
        name: "prop",
        types: [
          STRING
        ],
        required: true,
      }),
    ],
  },
];

export default OBJECT_OPTIONS
