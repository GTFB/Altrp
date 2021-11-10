import getInputSelectStyles from "./getInputSelectStyles";
import TreeComponent from "../../../../../editor/src/js/components/widgets/styled-components/TreeComponent";

export default function getInputSelectTreeStyles(settings) {
  return getInputSelectStyles(settings) + TreeComponent(settings)
}
