import THIS from "../parameter-types/THIS";
import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import NUMBER from "../parameter-types/NUMBER";

const classDescription = `Number is a primitive wrapper object used to represent and manipulate numbers like 37 or -9.25.`

const NUMBER_OPTIONS = [
  {
    value: 'number.toFixed',
    objectInstance: 'number',
    label: 'toFixed',
    description: ' The toFixed() method formats a number using fixed-point notation. ',
    classDescription,
    returns: [
      STRING,
    ],
    parameters:[
      new Parameter({
        name: "digits",
        types: [NUMBER],
        required: true,
      }),
    ],
  },
]

export default NUMBER_OPTIONS
