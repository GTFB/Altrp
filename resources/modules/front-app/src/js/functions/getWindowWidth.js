import isEditor from "./isEditor";

export default function getWindowWidth() {
  let window;
  if (isEditor()) {
    window = document.getElementById("editorWindow").offsetWidth;
  } else {
    window = document.getElementById("front-app").offsetWidth;
  }
  return window;
}
