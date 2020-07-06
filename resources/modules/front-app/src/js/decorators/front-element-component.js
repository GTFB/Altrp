/**
 * Срабатываает перед удалением компонента элемента
 */
function componentWillUnmount(){
  console.log(this);
  this.element
}

/**
 * Декорирует компонент элемента методами необходимыми на фронте и в редакторе
 * @param component
 */
export default function frontDecorate(component) {
  component.componentWillUnmount = componentWillUnmount.bind(component);
}