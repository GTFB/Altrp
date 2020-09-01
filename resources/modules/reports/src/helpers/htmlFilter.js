import beautify from "js-beautify/js/lib/beautify-html";

const arr = ["isActive", "canDrop", 'draggable="true"'];

export default () => {
  let html = document.querySelector(".rrbe__preview")?.innerHTML || "";
  html = beautify.html_beautify(html);
  return arr.reduce((result, word) => result.replace(word, ""), html);
};
