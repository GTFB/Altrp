/**
 * Возвращает шаблон корневого элемента для письма
 * @return {null}
 */
export default function sectionElementEmailRender(){
  console.log(this);

  let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
  return (
      <React.Fragment>
        {this.props.element.getSettings("test-text-4")}
        {this.state.children.map(section => (
            <ElementWrapper
                ElementWrapper={ElementWrapper}
                key={section.getId()}
                component={section.componentClass}
                element={section}
            />
        ))}
      </React.Fragment>
  );
  return null;
}