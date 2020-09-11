/*
  Helper: styles
  Приводит параметры стилей к необходимому типу
  import st from "helpers/styles"
*/

// Массив параметров необходимых приводить в числовое значение
const numericStyles = ["fontSize", "margin", "padding"];

// Функция приведения параметра к необходимому типу значения
export default (el, appendix = "rem") => {
  // Если параметра нет в списке возвращаем все как было
  if (!numericStyles.includes(el.name)) return el;
  // Если есть апендикс добавляем
  return {
    name: el.name,
    value: el.value + appendix,
  };
};
