/**
 * случайная строка
 * @return {string}
 */
export default function altrpRandomId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}
