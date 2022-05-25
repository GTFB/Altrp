
/**
 * Переменная, в которой храниться изначальный заголовок
 * @let {string}
 */
let defaultTitle;

/**
 * Устанавливает заголовок страницы на фронтенде
 * @param {string} title
 */
export default function setTitle(title) {
  let titleElement = document.title;
  if (!defaultTitle) {
    defaultTitle = titleElement.innerHTML;
  }
  if (!title) {
    title = defaultTitle;
  }
  if (document.title !== title) {
    document.title = title;
  }
}
