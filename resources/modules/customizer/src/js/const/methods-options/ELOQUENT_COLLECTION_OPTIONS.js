import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import ANY from "../parameter-types/ANY";
import ARRAY from "../parameter-types/ARRAY";
import NULL from "../parameter-types/NULL";
import COLLECTION_OPTIONS from "./COLLECTION_OPTIONS";
import BOOL from "../parameter-types/BOOL";

const classDescriptionExtends = "class Collection extends Collection implements QueueableCollection (View source)"

const COLLECTION_OPTIONS_EXTENDS = COLLECTION_OPTIONS.map(item => {
  return {
    value: `EloquentCollection.${item.label}`,
    objectInstance: "EloquentCollection",
    label: item.label,
    classDescriptionExtends,
    returns: item.returns || null,
    parameters: item.parameters
  }
})

const ELOQUENT_COLLECTION_OPTIONS = [
  ...COLLECTION_OPTIONS_EXTENDS,
  {
    value: 'EloquentCollection.firstWhere',
    objectInstance: 'EloquentCollection',
    label: 'firstWhere',
    description: 'Get the first item by the given key value pair.',
    classDescriptionExtends,
    returns: ANY,
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'operator',
        types: ANY,
        required: false,
      }),
      new Parameter({
        name: 'value',
        types: ANY,
        required: false,
      }),
    ],
  },
  {
    value: 'EloquentCollection.where',
    objectInstance: 'EloquentCollection',
    label: 'where',
    description: 'Filter items by the given key value pair.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'operator',
        types: ANY,
        required: false,
      }),
      new Parameter({
        name: 'value',
        types: ANY,
        required: false,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereNull',
    objectInstance: 'EloquentCollection',
    label: 'whereNull',
    description: 'Filter items where the given key is not null.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING, NULL],
        required: false,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereNotNull',
    objectInstance: 'EloquentCollection',
    label: 'whereNotNull',
    description: 'Filter items where the given key is null.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING, NULL],
        required: false,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereStrict',
    objectInstance: 'EloquentCollection',
    label: 'whereStrict',
    description: 'Filter items by the given key value pair using strict comparison.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'value',
        types: ANY,
        required: true,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereIn',
    objectInstance: 'EloquentCollection',
    label: 'whereIn',
    description: 'Filter items by the given key value pair.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'values',
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: 'strict',
        types: [BOOL],
        required: false,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereInStrict',
    objectInstance: 'EloquentCollection',
    label: 'whereInStrict',
    description: 'Filter items by the given key value pair using strict comparison.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'values',
        types: ANY,
        required: true,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereBetween',
    objectInstance: 'EloquentCollection',
    label: 'whereBetween',
    description: 'Filter items such that the value of the given key is between the given values.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'values',
        types: [ARRAY],
        required: true,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereNotBetween',
    objectInstance: 'EloquentCollection',
    label: 'whereNotBetween',
    description: 'Filter items such that the value of the given key is not between the given values.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'values',
        types: [ARRAY],
        required: true,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereNotIn',
    objectInstance: 'EloquentCollection',
    label: 'whereNotIn',
    description: 'Filter items by the given key value pair.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'values',
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: 'strict',
        types: [BOOL],
        required: false,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereNotInStrict',
    objectInstance: 'EloquentCollection',
    label: 'whereNotInStrict',
    description: 'Filter items by the given key value pair using strict comparison.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'key',
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: 'values',
        types: ANY,
        required: true,
      }),
    ],
  },
  {
    value: 'EloquentCollection.whereInstanceOf',
    objectInstance: 'EloquentCollection',
    label: 'whereInstanceOf',
    description: 'Filter the items, removing any items that don\'t match the given type.',
    classDescriptionExtends,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: 'type',
        types: [STRING],
        required: true,
      }),
    ],
  }
];

export default ELOQUENT_COLLECTION_OPTIONS
