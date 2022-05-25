export default function isSSR(){
  try {
    return window.SSR;
  } catch (e) {
    return false;
  }
}
