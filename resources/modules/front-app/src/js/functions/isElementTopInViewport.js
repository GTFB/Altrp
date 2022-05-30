export default function isElementTopInViewport(top, scrollTop, clientHeight) {
  return top > scrollTop && top < scrollTop + clientHeight;
}
