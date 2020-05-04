
export function changeSetting(settingName, value) {
  let newState = this.state;
  newState.settings[settingName] = value;
  this.setState({
    ...newState
  })
}

export function setChildren(children) {
  this.setState({
      ...this.state,
    children
  });
  if(this.props.wrapper && this.props.wrapper.setState){
    this.props.wrapper.setState(()=> ({
      ...this.state,
      children
      })
    );
  }
}

export default function decorate(component) {
  component.changeSetting = changeSetting.bind(component);
  component.setChildren = setChildren.bind(component);
}