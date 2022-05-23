import isAltrpJS from "../helpers/isAltrpJS";

const PROPERTY_OPTIONS =  [
  {
    label: 'context.',
    value: 'context',
  },
  {
    label: 'session.',
    value: 'session',
  },
  {
    label: 'this.',
    value: 'this',
  },
  {
    label: 'env.',
    value: 'env',
  },
  {
    label: 'current_user.',
    value: 'current_user',
  },
  {
    label: 'expression',
    value: 'expression',
  },
];
if(isAltrpJS()){
  PROPERTY_OPTIONS.push(
    {
      label: 'httpContext.',
      value: 'httpContext',
    },)
}
export default PROPERTY_OPTIONS;
