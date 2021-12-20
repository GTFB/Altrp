import Parameter from "../../classes/Parameter";
import STRING from "../parameter-types/STRING";
import INT from "../parameter-types/INT";
import FUNCTION from "../parameter-types/FUNCTION";
import BUILDER from "../parameter-types/BUILDER";
import ANY from "../parameter-types/ANY";
import ARRAY from "../parameter-types/ARRAY";
import NULL from "../parameter-types/NULL";
import BOOL from "../parameter-types/BOOL";
import FLOAT from "../parameter-types/FLOAT";
import MODEL from "../parameter-types/MODEL";
import OBJECT from "../parameter-types/OBJECT";
import BUILDS_QUERIES from "../parameter-types/BUILDS_QUERIES";
import COLLECTION from "../parameter-types/COLLECTION";
import CLOSURE from "../parameter-types/CLOSURE";
import JOIN_CLAUSE from "../parameter-types/JOIN_CLAUSE";
import ARRAYABLE from "../parameter-types/ARRAYABLE";
import DATE_TIME_INTERFACE from "../parameter-types/DATE_TIME_INTERFACE";
import EXPRESSION from "../parameter-types/EXPRESSION";
import LENGTH_AWARE_PAGINATOR from "../parameter-types/LENGTH_AWARE_PAGINATOR";
import PAGINATOR from "../parameter-types/PAGINATOR";

const classDescription = "class Builder (View source)"

const BUILDER_OPTIONS = [
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
  },
  {
    value: 'Builder.first',
    objectInstance: 'Builder',
    label: 'first',
    description: 'Execute the query and get the first result.',
    classDescription,
    returns: [MODEL, OBJECT, BUILDS_QUERIES, NULL],
    parameters:[
      new Parameter({
        name: "columns",
        types: [ARRAY, STRING],
        required: false,
      }),
    ],
  },
  {
    value: 'Builder.when',
    objectInstance: 'Builder',
    label: 'when',
    description: 'Apply the callback\'s query changes if the given "value" is true.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "callback",
        types: [FUNCTION],
        required: true,
      }),
      new Parameter({
        name: "default",
        types: [FUNCTION, NULL],
        required: false,
      }),
    ],
  },
  {
    value: 'Builder.get',
    objectInstance: 'Builder',
    label: 'get',
    description: 'Execute the query as a "select" statement.',
    classDescription,
    returns: [COLLECTION],
    parameters:[
      new Parameter({
        name: "columns",
        types: [ARRAY, STRING],
        required: false,
      }),
    ],
  },
  {
    value: 'Builder.forPageBeforeId',
    objectInstance: 'Builder',
    label: 'forPageBeforeId',
    description: 'Constrain the query to the previous "page" of results before a given ID.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "perPage",
        types: [INT],
        required: false,
      }),
      new Parameter({
        name: "lastId",
        types: [INT, NULL],
        required: false,
      }),
      new Parameter({
        name: "column",
        types: [STRING],
        required: false,
      }),
    ],
  },
  {
    value: 'Builder.forPageAfterId',
    objectInstance: 'Builder',
    label: 'forPageAfterId',
    description: 'Constrain the query to the next "page" of results after a given ID.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "perPage",
        types: [INT],
        required: false,
      }),
      new Parameter({
        name: "lastId",
        types: [INT, NULL],
        required: false,
      }),
      new Parameter({
        name: "column",
        types: [STRING],
        required: false,
      }),
    ],
  },
  {
    value: 'Builder.union',
    objectInstance: 'Builder',
    label: 'union',
    description: 'Add a union statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "query",
        types: [BUILDER, CLOSURE],
        required: true,
      }),
      new Parameter({
        name: "all",
        types: [BOOL],
        required: false,
      }),
    ],
  },
  {
    value: 'Builder.unionAll',
    objectInstance: 'Builder',
    label: 'unionAll',
    description: 'Add a union all statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "query",
        types: [BUILDER, CLOSURE],
        required: true,
      }),
    ],
  },
  {
    value: 'Builder.tap',
    objectInstance: 'Builder',
    label: 'tap',
    description: 'Pass the query to a given callback.',
    classDescription,
    parameters:[
      new Parameter({
        name: "callback",
        types: [FUNCTION],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.select',
    objectInstance: 'Builder',
    label: 'select',
    description: 'Set the columns to be selected.',
    classDescription,
    parameters:[
      new Parameter({
        name: "columns",
        types: ANY,
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.selectSub',
    objectInstance: 'Builder',
    label: 'selectSub',
    description: 'Add a subselect expression to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "query",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "as",
        types: [STRING],
        required: true,
      }),
    ],
  },
  {
    value: 'Builder.selectRaw',
    objectInstance: 'Builder',
    label: 'selectRaw',
    description: 'Add a new "raw" select expression to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "expression",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.fromSub',
    objectInstance: 'Builder',
    label: 'fromSub',
    description: 'Makes "from" fetch from a subquery.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "query",
        types: [CLOSURE, BUILDER, STRING],
        required: true,
      }),
      new Parameter({
        name: "as",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.fromRaw',
    objectInstance: 'Builder',
    label: 'fromRaw',
    description: 'Add a raw from clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "expression",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: ANY,
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.createSub',
    objectInstance: 'Builder',
    label: 'createSub',
    description: 'Creates a subquery and parse it.',
    classDescription,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: "query",
        types: [CLOSURE, BUILDER, STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.parseSub',
    objectInstance: 'Builder',
    label: 'parseSub',
    description: 'Parse the subquery into SQL and bindings.',
    classDescription,
    returns: [ARRAY],
    parameters:[
      new Parameter({
        name: "query",
        types: ANY,
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.addSelect',
    objectInstance: 'Builder',
    label: 'addSelect',
    description: 'Add a new select column to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: ANY,
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.distinct',
    objectInstance: 'Builder',
    label: 'distinct',
    description: 'Force the query to only return distinct results.',
    classDescription,
    parameters:[
    ]
  },
  {
    value: 'Builder.from',
    objectInstance: 'Builder',
    label: 'from',
    description: 'Set the table which the query is targeting.',
    classDescription,
    parameters:[
      new Parameter({
        name: "table",
        types: [CLOSURE, BUILDER, STRING],
        required: true,
      }),
      new Parameter({
        name: "as",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.join',
    objectInstance: 'Builder',
    label: 'join',
    description: 'Add a join clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "type",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "where",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.joinWhere',
    objectInstance: 'Builder',
    label: 'joinWhere',
    description: 'Add a "join where" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "second",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "type",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.joinSub',
    objectInstance: 'Builder',
    label: 'joinSub',
    description: 'Add a subquery join clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "query",
        types: [CLOSURE, BUILDER, STRING],
        required: true,
      }),
      new Parameter({
        name: "as",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "type",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "where",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.leftJoin',
    objectInstance: 'Builder',
    label: 'leftJoin',
    description: 'Add a left join to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.leftJoinWhere',
    objectInstance: 'Builder',
    label: 'leftJoinWhere',
    description: 'Add a "join where" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "second",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.leftJoinSub',
    objectInstance: 'Builder',
    label: 'leftJoinSub',
    description: 'Add a subquery left join to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "query",
        types: [CLOSURE, BUILDER, STRING],
        required: true,
      }),
      new Parameter({
        name: "as",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.rightJoin',
    objectInstance: 'Builder',
    label: 'rightJoin',
    description: 'Add a right join to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.rightJoinWhere',
    objectInstance: 'Builder',
    label: 'rightJoinWhere',
    description: 'Add a "right join where" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "second",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.rightJoinSub',
    objectInstance: 'Builder',
    label: 'rightJoinSub',
    description: 'Add a subquery right join to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "query",
        types: [CLOSURE, BUILDER, STRING],
        required: true,
      }),
      new Parameter({
        name: "as",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.crossJoin',
    objectInstance: 'Builder',
    label: 'crossJoin',
    description: 'Add a "cross join" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "first",
        types: [CLOSURE, STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.newJoinClause',
    objectInstance: 'Builder',
    label: 'newJoinClause',
    description: 'Get a new join clause.',
    classDescription,
    returns: [JOIN_CLAUSE],
    parameters:[
      new Parameter({
        name: "parentQuery",
        types: [BUILDER],
        required: true,
      }),
      new Parameter({
        name: "type",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "table",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.mergeWheres',
    objectInstance: 'Builder',
    label: 'mergeWheres',
    description: 'Merge an array of where clauses and bindings.',
    classDescription,
    returns: [],
    parameters:[
      new Parameter({
        name: "wheres",
        types: [ARRAY],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: [ARRAY],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.where',
    objectInstance: 'Builder',
    label: 'where',
    description: 'Add a basic where clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [CLOSURE, STRING, ARRAY],
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
    ]
  },
  {
    value: 'Builder.orWhere',
    objectInstance: 'Builder',
    label: 'orWhere',
    description: 'Add an "or where" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [CLOSURE, STRING, ARRAY],
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
    ]
  },
  {
    value: 'Builder.whereColumn',
    objectInstance: 'Builder',
    label: 'whereColumn',
    description: 'Add a "where" clause comparing two columns to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "first",
        types: [STRING, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereColumn',
    objectInstance: 'Builder',
    label: 'orWhereColumn',
    description: 'Add an "or where" clause comparing two columns to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "first",
        types: [STRING, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "second",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereRaw',
    objectInstance: 'Builder',
    label: 'whereRaw',
    description: 'Add a raw where clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "sql",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: ANY,
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereRaw',
    objectInstance: 'Builder',
    label: 'orWhereRaw',
    description: 'Add a raw or where clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "sql",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: ANY,
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereIn',
    objectInstance: 'Builder',
    label: 'whereIn',
    description: 'Add a "where in" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereIn',
    objectInstance: 'Builder',
    label: 'orWhereIn',
    description: 'Add an "or where in" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: ANY,
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereNotIn',
    objectInstance: 'Builder',
    label: 'whereNotIn',
    description: 'Add a "where not in" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereNotIn',
    objectInstance: 'Builder',
    label: 'orWhereNotIn',
    description: 'Add an "or where not in" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: ANY,
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereIntegerInRaw',
    objectInstance: 'Builder',
    label: 'whereIntegerInRaw',
    description: 'Add a "where in raw" clause for integer values to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAYABLE, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereIntegerNotInRaw',
    objectInstance: 'Builder',
    label: 'whereIntegerNotInRaw',
    description: 'Add a "where not in raw" clause for integer values to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAYABLE, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereNull',
    objectInstance: 'Builder',
    label: 'whereNull',
    description: 'Add a "where null" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "columns",
        types: [STRING, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereNull',
    objectInstance: 'Builder',
    label: 'orWhereNull',
    description: 'Add an "or where null" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereNotNull',
    objectInstance: 'Builder',
    label: 'whereNotNull',
    description: 'Add a "where not null" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "columns",
        types: [STRING, ARRAY],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereBetween',
    objectInstance: 'Builder',
    label: 'whereBetween',
    description: 'Add a where between statement to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereBetween',
    objectInstance: 'Builder',
    label: 'orWhereBetween',
    description: 'Add an or where between statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereNotBetween',
    objectInstance: 'Builder',
    label: 'whereNotBetween',
    description: 'Add a where not between statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereNotBetween',
    objectInstance: 'Builder',
    label: 'orWhereNotBetween',
    description: 'Add an or where not between statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.orWhereNotNull',
    objectInstance: 'Builder',
    label: 'orWhereNotNull',
    description: 'Add an "or where not null" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereDate',
    objectInstance: 'Builder',
    label: 'whereDate',
    description: 'Add a "where date" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereDate',
    objectInstance: 'Builder',
    label: 'orWhereDate',
    description: 'Add an "or where date" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereTime',
    objectInstance: 'Builder',
    label: 'whereTime',
    description: 'Add a "where time" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereTime',
    objectInstance: 'Builder',
    label: 'orWhereTime',
    description: 'Add an "or where time" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereDay',
    objectInstance: 'Builder',
    label: 'whereDay',
    description: 'Add a "where day" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereDay',
    objectInstance: 'Builder',
    label: 'orWhereDay',
    description: 'Add an "or where day" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereMonth',
    objectInstance: 'Builder',
    label: 'whereMonth',
    description: 'Add a "where month" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereMonth',
    objectInstance: 'Builder',
    label: 'orWhereMonth',
    description: 'Add an "or where month" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereYear',
    objectInstance: 'Builder',
    label: 'whereYear',
    description: 'Add a "where year" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, INT, NULL],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereYear',
    objectInstance: 'Builder',
    label: 'orWhereYear',
    description: 'Add an "or where year" statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: [DATE_TIME_INTERFACE, STRING, INT, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereNested',
    objectInstance: 'Builder',
    label: 'whereNested',
    description: 'Add a nested where statement to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "callback",
        types: [CLOSURE],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereSub',
    objectInstance: 'Builder',
    label: 'whereSub',
    description: 'Add a full sub-select to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "callback",
        types: [CLOSURE],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereExists',
    objectInstance: 'Builder',
    label: 'whereExists',
    description: 'Add an exists clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "callback",
        types: [CLOSURE],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereExists',
    objectInstance: 'Builder',
    label: 'orWhereExists',
    description: 'Add an or exists clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "callback",
        types: [CLOSURE],
        required: true,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.whereNotExists',
    objectInstance: 'Builder',
    label: 'whereNotExists',
    description: 'Add a where not exists clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "callback",
        types: [CLOSURE],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereNotExists',
    objectInstance: 'Builder',
    label: 'orWhereNotExists',
    description: 'Add a where not exists clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "callback",
        types: [CLOSURE],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereJsonContains',
    objectInstance: 'Builder',
    label: 'whereJsonContains',
    description: 'Add a "where JSON contains" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereJsonContains',
    objectInstance: 'Builder',
    label: 'orWhereJsonContains',
    description: 'Add a "or where JSON contains" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereJsonDoesntContain',
    objectInstance: 'Builder',
    label: 'whereJsonDoesntContain',
    description: 'Add a "where JSON not contains" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orWhereJsonDoesntContain',
    objectInstance: 'Builder',
    label: 'orWhereJsonDoesntContain',
    description: 'Add a "or where JSON not contains" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "value",
        types: ANY,
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.whereJsonLength',
    objectInstance: 'Builder',
    label: 'whereJsonLength',
    description: 'Add a "where JSON length" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: ANY,
        required: true,
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
    ]
  },
  {
    value: 'Builder.orWhereJsonLength',
    objectInstance: 'Builder',
    label: 'orWhereJsonLength',
    description: 'Add a "or where JSON length" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: ANY,
        required: true,
      }),
      new Parameter({
        name: "value",
        types: ANY,
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.groupBy',
    objectInstance: 'Builder',
    label: 'groupBy',
    description: 'Add a "group by" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "groups",
        types: [ARRAY, STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.groupByRaw',
    objectInstance: 'Builder',
    label: 'groupByRaw',
    description: 'Add a raw groupBy clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "sql",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.having',
    objectInstance: 'Builder',
    label: 'having',
    description: 'Add a "having" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "value",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orHaving',
    objectInstance: 'Builder',
    label: 'orHaving',
    description: 'Add a "or having" clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "operator",
        types: [STRING, NULL],
        required: false,
      }),
      new Parameter({
        name: "value",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.havingBetween',
    objectInstance: 'Builder',
    label: 'havingBetween',
    description: 'Add a "having between " clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "not",
        types: [BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.havingRaw',
    objectInstance: 'Builder',
    label: 'havingRaw',
    description: 'Add a raw having clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "sql",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: [ARRAY],
        required: false,
      }),
      new Parameter({
        name: "boolean",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orHavingRaw',
    objectInstance: 'Builder',
    label: 'orHavingRaw',
    description: 'Add a raw or having clause to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "sql",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orderBy',
    objectInstance: 'Builder',
    label: 'orderBy',
    description: 'Add an "order by" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "column",
        types: [CLOSURE, BUILDER, EXPRESSION, STRING],
        required: true,
      }),
      new Parameter({
        name: "direction",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.latest',
    objectInstance: 'Builder',
    label: 'latest',
    description: 'Add an "order by" clause for a timestamp to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.oldest',
    objectInstance: 'Builder',
    label: 'oldest',
    description: 'Add an "order by" clause for a timestamp to the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.inRandomOrder',
    objectInstance: 'Builder',
    label: 'inRandomOrder',
    description: 'Put the query\'s results in random order.',
    classDescription,
    parameters:[
      new Parameter({
        name: "seed",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.orderByRaw',
    objectInstance: 'Builder',
    label: 'orderByRaw',
    description: 'Add a raw "order by" clause to the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "sql",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "bindings",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.take',
    objectInstance: 'Builder',
    label: 'take',
    description: 'Alias to set the "limit" value of the query.',
    classDescription,
    returns: [BUILDER],
    parameters:[
      new Parameter({
        name: "value",
        types: [INT],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.limit',
    objectInstance: 'Builder',
    label: 'limit',
    description: 'Set the "limit" value of the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "value",
        types: [INT],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.lock',
    objectInstance: 'Builder',
    label: 'lock',
    description: 'Lock the selected rows in the table.',
    classDescription,
    parameters:[
      new Parameter({
        name: "value",
        types: [STRING, BOOL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.lockForUpdate',
    objectInstance: 'Builder',
    label: 'lockForUpdate',
    description: 'Lock the selected rows in the table for updating.',
    classDescription,
    returns: [BUILDER],
    parameters:[
    ]
  },
  {
    value: 'Builder.value',
    objectInstance: 'Builder',
    label: 'value',
    description: 'Get a single column\'s value from the first result of a query.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.runSelect',
    objectInstance: 'Builder',
    label: 'runSelect',
    description: 'Run the query as a "select" statement against the connection.',
    classDescription,
    returns: [ARRAY],
    parameters:[
    ]
  },
  {
    value: 'Builder.paginate',
    objectInstance: 'Builder',
    label: 'paginate',
    description: 'Paginate the given query into a simple paginator.',
    classDescription,
    returns: [LENGTH_AWARE_PAGINATOR],
    parameters:[
      new Parameter({
        name: "perPage",
        types: [INT],
        required: false,
      }),
      new Parameter({
        name: "columns",
        types: [ARRAY],
        required: false,
      }),
      new Parameter({
        name: "pageName",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "page",
        types: [INT, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.simplePaginate',
    objectInstance: 'Builder',
    label: 'simplePaginate',
    description: 'Get a paginator only supporting simple next and previous links.',
    classDescription,
    returns: [PAGINATOR],
    parameters:[
      new Parameter({
        name: "perPage",
        types: [INT],
        required: false,
      }),
      new Parameter({
        name: "columns",
        types: [ARRAY],
        required: false,
      }),
      new Parameter({
        name: "pageName",
        types: [STRING],
        required: false,
      }),
      new Parameter({
        name: "page",
        types: [INT, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.getCountForPagination',
    objectInstance: 'Builder',
    label: 'getCountForPagination',
    description: 'Get the count of the total records for the paginator.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "columns",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.implode',
    objectInstance: 'Builder',
    label: 'implode',
    description: 'Concatenate values of a given column as a string.',
    classDescription,
    returns: [STRING],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "glue",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.count',
    objectInstance: 'Builder',
    label: 'count',
    description: 'Retrieve the "count" result of the query.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "columns",
        types: [STRING],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.min',
    objectInstance: 'Builder',
    label: 'min',
    description: 'Retrieve the minimum value of a given column.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.max',
    objectInstance: 'Builder',
    label: 'max',
    description: 'Retrieve the maximum value of a given column',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.sum',
    objectInstance: 'Builder',
    label: 'sum',
    description: 'Retrieve the sum of the values of a given column.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.avg',
    objectInstance: 'Builder',
    label: 'avg',
    description: 'Retrieve the average of the values of a given column.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.aggregate',
    objectInstance: 'Builder',
    label: 'aggregate',
    description: 'Execute an aggregate function on the database.',
    classDescription,
    returns: ANY,
    parameters:[
      new Parameter({
        name: "function",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "columns",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.numericAggregate',
    objectInstance: 'Builder',
    label: 'numericAggregate',
    description: 'Execute a numeric aggregate function on the database.',
    classDescription,
    returns: [FLOAT, INT],
    parameters:[
      new Parameter({
        name: "function",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "columns",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.setAggregate',
    objectInstance: 'Builder',
    label: 'setAggregate',
    description: 'Set the aggregate property without running the query.',
    classDescription,
    parameters:[
      new Parameter({
        name: "function",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "columns",
        types: [ARRAY],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.dd',
    objectInstance: 'Builder',
    label: 'dd',
    description: 'Die and dump the current SQL and bindings.',
    classDescription,
    returns: [
    ],
    parameters:[
    ]
  },
  {
    value: 'Builder.delete',
    objectInstance: 'Builder',
    label: 'delete',
    description: 'Delete a record from the database.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "id",
        types: ANY,
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.decrement',
    objectInstance: 'Builder',
    label: 'decrement',
    description: 'Decrement a column\'s value by a given amount.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "amount",
        types: [FLOAT, INT],
        required: false,
      }),
      new Parameter({
        name: "extra",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.increment',
    objectInstance: 'Builder',
    label: 'increment',
    description: 'Increment a column\'s value by a given amount.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "column",
        types: [STRING],
        required: true,
      }),
      new Parameter({
        name: "amount",
        types: [FLOAT, INT],
        required: false,
      }),
      new Parameter({
        name: "extra",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.updateOrInsert',
    objectInstance: 'Builder',
    label: 'updateOrInsert',
    description: 'Insert or update a record matching the attributes, and fill it with values.',
    classDescription,
    returns: [BOOL],
    parameters:[
      new Parameter({
        name: "attributes",
        types: [ARRAY],
        required: true,
      }),
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.update',
    objectInstance: 'Builder',
    label: 'update',
    description: 'Update a record in the database.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.insertUsing',
    objectInstance: 'Builder',
    label: 'insertUsing',
    description: 'Insert new records into the table using a subquery.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "columns",
        types: [ARRAY],
        required: true,
      }),
      new Parameter({
        name: "query",
        types: [CLOSURE, BUILDER, STRING],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.insertGetId',
    objectInstance: 'Builder',
    label: 'insertGetId',
    description: 'Insert a new record and get the value of the primary key.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
      new Parameter({
        name: "sequence",
        types: [STRING, NULL],
        required: false,
      }),
    ]
  },
  {
    value: 'Builder.insertOrIgnore',
    objectInstance: 'Builder',
    label: 'insertOrIgnore',
    description: 'Insert a new record into the database while ignoring errors.',
    classDescription,
    returns: [INT],
    parameters:[
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
    ]
  },
  {
    value: 'Builder.insert',
    objectInstance: 'Builder',
    label: 'insert',
    description: 'Insert a new record into the database.',
    classDescription,
    returns: [BOOL],
    parameters:[
      new Parameter({
        name: "values",
        types: [ARRAY],
        required: true,
      }),
    ]
  }
]

export default BUILDER_OPTIONS;
