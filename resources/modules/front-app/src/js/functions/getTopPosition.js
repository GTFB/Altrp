export default function getTopPosition(element) {
  let top = element.offsetTop;

  while (element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
  }

  return top;
}
