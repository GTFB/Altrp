function componentDidUpdate() {
  let elementValue = this.props.currentElement.getSettings(this.props.controlId);
  if(this.state.value !== elementValue){
    if(elementValue === null){
      elementValue = this.getDefaultValue();
      this.props.currentElement.setSettingValue(this.props.controlId, elementValue);
    }
    this.setState({
      value: elementValue
    });
  }
}

let controllerDecorate = function elementWrapperDecorate(component) {
  component.componentDidUpdate = componentDidUpdate.bind(component);
};
export default controllerDecorate;