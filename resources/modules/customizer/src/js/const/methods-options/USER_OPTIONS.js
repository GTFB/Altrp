import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ARRAY from "../parameter-types/ARRAY";
import BOOL from "../parameter-types/BOOL";
import USER from "../parameter-types/USER";
import ANY from "../parameter-types/ANY";
import MODEL_OPTIONS from "./MODEL_OPTIONS";

const USER_EXTENDS_MODEL = MODEL_OPTIONS.map(item => {
  return {
    value: `userExtendsModel.${item.label}`,
    objectInstance: "User",
    label: item.label,
    returns: item.returns || null,
    parameters: item.parameters
  }
})

const USER_OPTIONS = [
  ...USER_EXTENDS_MODEL,
  {
    value: 'user.isAdmin',
    objectInstance: 'User',
    label: 'isAdmin',
    description: 'Check User is Administrator',
    returns: [BOOL],
    parameters:[
    ],
  },
  {
    value: 'user.hasRole',
    objectInstance: 'User',
    label: 'hasRole',
    description: 'Checks if the user has a role by its name.',
    returns: [BOOL],
    parameters:[
      new Parameter({
        name: "name",
        types: [STRING, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "team",
        types: [STRING, BOOL],
        required: false,
      }),
      new Parameter({
        name: "requireAll",
        types: [BOOL],
        required: false,
      }),
    ],
  },
  {
    value: 'user.hasPermission',
    objectInstance: 'User',
    label: 'hasPermission',
    description: 'Check if user has a permission by its name.',
    returns: [BOOL],
    parameters:[
      new Parameter({
        name: "permission",
        types: [STRING, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "team",
        types: [STRING, BOOL],
        required: false,
      }),
      new Parameter({
        name: "requireAll",
        types: [BOOL],
        required: false,
      }),
    ],
  },
  {
    value: 'user.attachRole',
    objectInstance: 'User',
    label: 'attachRole',
    description: 'Alias to eloquent many-to-many relation\'s attach() method.',
    returns: [USER],
    parameters:[
      new Parameter({
        name: "role",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "team",
        types: ANY,
        required: false,
      }),
    ],
  },
  {
    value: 'user.detachRole',
    objectInstance: 'User',
    label: 'detachRole',
    description: 'Alias to eloquent many-to-many relation\'s detach() method.',
    returns: [USER],
    parameters:[
      new Parameter({
        name: "role",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "team",
        types: ANY,
        required: false,
      }),
    ],
  },
  {
    value: 'user.attachPermission',
    objectInstance: 'User',
    label: 'attachPermission',
    description: 'Alias to eloquent many-to-many relation\'s attach() method.',
    returns: [USER],
    parameters:[
      new Parameter({
        name: "permission",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "team",
        types: ANY,
        required: false,
      }),
    ],
  },
  {
    value: 'user.detachPermission',
    objectInstance: 'User',
    label: 'detachPermission',
    description: 'Alias to eloquent many-to-many relation\'s detach() method.',
    returns: [USER],
    parameters:[
      new Parameter({
        name: "permission",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "team",
        types: ANY,
        required: false,
      }),
    ],
  }
];

export default USER_OPTIONS
