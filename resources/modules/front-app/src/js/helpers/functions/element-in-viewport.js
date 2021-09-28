export default function elementInViewport(element){
  let bounds = element.getBoundingClientRect();
  return (
    (bounds.top + bounds.height > 0) && // Елемент ниже верхней границы
    (window.innerHeight - bounds.top > 0) && // Выше нижней
    (bounds.left + bounds.width > 0) && // Правее левой
    (window.innerWidth - bounds.left > 0)// Левее правой
  );
}
