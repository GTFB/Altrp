/**
 * Возвращает шаблон корневого элемента для письма
 * @return {null}
 */
export default function rootElementEmailRender(){
  console.log(this);

  let classes = `sections-wrapper ${this.props.element
      .getSelector()
      .replace(".", "")} ${this.props.element.hasCardModel() ? 'sections-wrapper_card' : ''}`;
  let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
  return (
      <table>
        {this.props.element.getSettings("test-text-4")}
        {this.state.children.map(section => (
            <ElementWrapper
                ElementWrapper={ElementWrapper}
                key={section.getId()}
                component={section.componentClass}
                element={section}
            />
        ))}
      </table>
  );
  return null;
}