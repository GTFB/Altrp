import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import INT from "../parameter-types/INT";
import FUNCTION from "../parameter-types/FUNCTION";
import BUILDER from "../parameter-types/BUILDER";

const classDescription = "class Builder (View source)"

const BUILDER_OPTIONS = [
  {
    value: 'Builder.orderBy',
    objectInstance: 'Builder',
    label: 'orderBy',
    description: 'Add an "order by" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [FUNCTION],
        required: true,
      }),
      new Parameter({
        name: "direction",
        types: [STRING],
        required: false,
      }),
    ],
  },
  {
    value: 'Builder.orderByDesc',
    objectInstance: 'Builder',
    label: 'orderByDesc',
    description: 'Add a descending "order by" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'Builder.offset',
    objectInstance: 'Builder',
    label: 'offset',
    description: 'Set the "offset" value of the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "value",
        types: [INT],
        required: true,
      }),
    ],
  },
  {
    value: 'Builder.forPage',
    objectInstance: 'Builder',
    label: 'forPage',
    description: 'Set the limit and offset for a given page.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "page",
        types: [INT],
        required: true,
      }),
      new Parameter({
        name: "perPage",
        types: [INT],
        required: false,
      }),
    ],
  }
]

export default BUILDER_OPTIONS;
