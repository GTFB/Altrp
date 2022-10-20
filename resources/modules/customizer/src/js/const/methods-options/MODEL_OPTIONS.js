import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import INT from "../parameter-types/INT";
import ARRAY from "../parameter-types/ARRAY";
import BOOL from "../parameter-types/BOOL";
import CARBON from "../parameter-types/CARBON";
import NULL from "../parameter-types/NULL";
import FUNCTION from "../parameter-types/FUNCTION";

const classDescription = "abstract class Model implements Arrayable, ArrayAccess, Jsonable, JsonSerializable, QueueableEntity, UrlRoutable (View source)"

const MODEL_OPTIONS = [
  {
    value: 'Model.relationsToArray',
    objectInstance: 'Model',
    label: 'relationsToArray',
    description: 'Get the model\'s relationships in array form.',
    classDescription,
    returns: [ARRAY],
    parameters:[
    ],
  },
  {
    value: 'Model.setAttribute',
    objectInstance: 'Model',
    label: 'setAttribute',
    description: 'Set a given attribute on the model.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "key",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      })
    ],
  },
  {
    value: 'Model.asDate',
    objectInstance: 'Model',
    label: 'asDate',
    description: 'Return a timestamp as DateTime object with time set to 00:00:00.',
    classDescription,
    returns: [CARBON],
    parameters:[
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
    ],
  },
  {
    value: 'Model.asDateTime',
    objectInstance: 'Model',
    label: 'asDateTime',
    description: 'Return a timestamp as DateTime object.',
    classDescription,
    returns: [CARBON],
    parameters:[
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
    ],
  },
  {
    value: 'Model.asTimestamp',
    objectInstance: 'Model',
    label: 'asTimestamp',
    description: 'Return a timestamp as unix timestamp.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
    ],
  },
  {
    value: 'Model.getOriginal',
    objectInstance: 'Model',
    label: 'getOriginal',
    description: 'Get the model\'s original attribute values.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "key",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "default",
        types: ANY,
        required: false,
      }),
    ],
  },
  {
    value: 'Model.getRelations',
    objectInstance: 'Model',
    label: 'getRelations',
    description: 'Get all the loaded relations for the instance.',
    classDescription,
    returns: [ARRAY],
    parameters:[
    ],
  },
  {
    value: 'Model.touch',
    objectInstance: 'Model',
    label: 'touch',
    description: 'Update the model\'s update timestamp.',
    classDescription,
    returns: [BOOL],
    parameters:[
    ],
  },
  {
    value: 'Model.fill',
    objectInstance: 'Model',
    label: 'fill',
    description: 'Fill the model with an array of attributes.',
    classDescription,
    parameters:[
      new Parameter({
        name: "attributes",
        types: [ARRAY],
        required: true,
      }),
    ],
  },
  {
    value: 'Model.save',
    objectInstance: 'Model',
    label: 'save',
    description: 'Save the model to the database.',
    classDescription,
    returns: [BOOL],
    parameters:[
      new Parameter({
        name: "options",
        types: [ARRAY],
        required: false,
      }),
    ],
  },
  {
    value: 'Model.delete',
    objectInstance: 'Model',
    label: 'delete',
    description: 'Delete the model from the database.',
    classDescription,
    returns: [BOOL, NULL],
    parameters:[
    ],
  },
  {
    value: 'Model.update',
    objectInstance: 'Model',
    label: 'update',
    description: 'Update the model in the database.',
    classDescription,
    returns: [BOOL],
    parameters:[
      new Parameter({
        name: "attributes",
        types: [ARRAY],
        required: false,
      }),
      new Parameter({
        name: "options",
        types: [ARRAY],
        required: false,
      }),
    ],
  },
  {
    value: 'Model.push',
    objectInstance: 'Model',
    label: 'push',
    description: 'Save the model and all of its relationships.',
    classDescription,
    returns: [BOOL],
    parameters:[
    ],
  },
  {
    value: 'Model.toArray',
    objectInstance: 'Model',
    label: 'toArray',
    description: 'Convert the model instance to an array.',
    classDescription,
    returns: [ARRAY],
    parameters:[
    ],
  },
  {
    value: 'Model.asJson',
    objectInstance: 'Model',
    label: 'asJson',
    description: 'Encode the given value as JSON.',
    classDescription,
    returns: [STRING],
    parameters:[
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
    ],
  },
  {
    value: 'Model.toJSON',
    objectInstance: 'Model',
    label: 'toJSON',
    description: 'Convert the model instance to JSON.',
    classDescription,
    returns: [STRING],
    parameters:[
      new Parameter({
        name: "options",
        types: [INT],
        required: false,
      }),
    ],
  },
  {
    value: 'Model.where',
    objectInstance: 'Model',
    label: 'where',
    description: 'Add a basic where clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [FUNCTION, STRING, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: ANY,
        required: false,
      }),
      new Parameter({
        name: "value",
        types: ANY,
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ],
  }
];


export default MODEL_OPTIONS
