
import styled from 'styled-components';

const TableComponent = styled.div``;

/**
 *
 * @param {HTMLElement}element
 * @return {number}
 */
function getChildrenWidth(element){
  let width = 0;
  if(! element || ! element.children){
    return width;
  }
  let children = _.toArray(element.children);
  children.forEach(childItem=>{
    if(! childItem.offsetParent){
      width += getChildrenWidth(childItem);
    }
    if(childItem.offsetLeft >= width){
      width += childItem.offsetWidth;
    }
  });
  return width;
}

export default TableComponent;