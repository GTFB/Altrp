import React, {Component} from "react";

class Styles extends Component {
  constructor(props){
    super(props);
    this.state = {
      elementStyles: []
    };
    window.stylesModule = this;
    window.stylesModuleResolve(this);
  }
  /**
   * @param {string} elementId
   * @param {string} styles
   * */
  addElementStyles(elementId, styles){
    if(!styles){
      return
    }
    let elementFound = false;
    let elementStyles = [...this.state.elementStyles];
    elementStyles.forEach(elementStyle=>{
      if(elementStyle.elementId === elementId){
        elementFound = true;
        elementStyle.styles = styles;
      }
    });
    if(!elementFound){
      elementStyles.push({
        elementId,
        styles,
      })
    }
    this.setState({
      ...this.state,
      elementStyles: elementStyles
    });
  }
  render(){
     return <div className="styles-container">
      {this.state.elementStyles.map(elementStyle => {
        return<style data-styles-id={elementStyle.elementId} key={elementStyle.elementId}>{elementStyle.styles}</style>
      })}
    </div>
  }
}

export default Styles