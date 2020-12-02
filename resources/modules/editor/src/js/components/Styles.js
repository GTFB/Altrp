import React, {Component} from "react";
import {isEditor, renderFontLink} from "../../../../front-app/src/js/helpers";
import {connect} from "react-redux";

class Styles extends Component {
  constructor(props){
    super(props);
    this.state = {
      elementStyles: [],
      fonts: [],
    };
    this.stylesContainer = React.createRef();
    window.stylesModule = this;
    window.stylesModuleResolve(this);
  }

  /**
   * шрифты для загрузки в iframe редактора
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps,prevState){
    if(! isEditor()){
      return;
    }
    let fonts = new Set();
    const fontsPairs = _.toPairs(this.props.altrpFonts.getData());
    fontsPairs.forEach(([key, value])=>{
      fonts.add(value);
    });
    fonts = _.toArray(fonts);
    if(_.isEqual(fonts, this.state.fonts)){
      return;
    }
    this.setState(state => ({...state, fonts}));
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
      elementStyles
    })
  }
  render(){
    let elementStyles = _.uniqBy(this.state.elementStyles, 'elementId');
    return <div className="styles-container" id="styles-container" ref={this.stylesContainer}>
      {elementStyles.map(elementStyle => {
        return<style data-styles-id={elementStyle.elementId}
                     id={`altrp-styles${elementStyle.elementId}`}
                     className={`altrp-styles${elementStyle.elementId}`}
                     key={elementStyle.elementId}>{elementStyle.styles}</style>
      })}
      {isEditor() ? this.state.fonts.map(renderFontLink) : null}
    </div>
  }
}

function mapStateToProps(state) {
  if(! isEditor()){
    return {};
  }
  return {
    altrpFonts: state.altrpFonts,
  };
}
export default connect(mapStateToProps)(Styles);
