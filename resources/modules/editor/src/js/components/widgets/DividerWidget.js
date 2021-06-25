
(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-divider {
    padding-top: 15px;
    padding-bottom: 15px;
    line-height: 0;
    font-size: 0;
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .altrp-divider-separator {
    display: block;
    height: 1px;
    width: 100%;
  }

  .altrp-divider-label {
    line-height: normal;
    font-size: medium;
  }
`);

class DividerWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }
  render() {
    let style = {};
    let styleSeparator = {};
    let labelStyle = {};

    let borderColor = this.props.element.getResponsiveSetting("divider_style_color", null, { color: "#000" }).color;
    let borderWidth = this.props.element.getResponsiveSetting("divider_style_weight", null, { size: 1 }).size + "px";
    let imageSize = this.props.element.getResponsiveSetting("divider_style_size", null, { size: 20 }).size + "px";
    let imageAmount =  this.props.element.getResponsiveSetting("divider_style_amount", null, { size: 20 }).size + "px";

    switch (this.state.settings.divider_style_type) {
      case "solid":
        styleSeparator = {
          borderTop: borderWidth + " " + "solid" + " " + borderColor
        };
        break;
      case "none":
        styleSeparator = {
        };
        break;
      case "double":
        styleSeparator = {
          borderTop: borderWidth + " " + "double" + " " + borderColor
        };
        break;
      case "dotted":
        styleSeparator = {
          borderTop: borderWidth + " " + "dotted" + " " + borderColor
        };
        break;
      case "dashed":
        styleSeparator = {
          borderTop: borderWidth + " " + "dashed" + " " + borderColor
        }
        break;
      case "curly":
        // console.log(this.state.settings.divider_style_color.substr(1))
        styleSeparator = {
          backgroundRepeat: "repeat-x",
          backgroundSize: imageAmount + " 100%",
          minHeight: imageSize,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' overflow='visible' height='100%' viewBox='0 0 24 24' stroke='${borderColor}' stroke-width='${this.state.settings.divider_style_weight.size}' fill='none' stroke-linecap='square' stroke-miterlimit='10'%3E%3Cpath d='M0,21c3.3,0,8.3-0.9,15.7-7.1c6.6-5.4,4.4-9.3,2.4-10.3c-3.4-1.8-7.7,1.3-7.3,8.8C11.2,20,17.1,21,24,21'/%3E%3C/svg%3E")`
        };
        break;
      default:
        break;
    }

    let dividerAlignment = this.props.element.getResponsiveSetting("divider_alignment", null, "center");;
    switch (dividerAlignment) {
      case "left":
        styleSeparator = {
          ...styleSeparator,
          marginRight: "auto",
        }
        break;
      case "right":
        styleSeparator = {
          ...styleSeparator,
          marginLeft: "auto"
        }
        break;
      case "center":
        styleSeparator = {
          ...styleSeparator,
          marginRight: "auto",
          marginLeft: "auto"
        }
        break;
    }

    let divider = <div className="altrp-divider" style={style}><span className="altrp-divider-separator" style={styleSeparator}></span></div>
    switch (this.state.settings.divider_add_element) {
      case "none":
        divider = <div className="altrp-divider" style={style}><span className="altrp-divider-separator" style={styleSeparator}></span></div>
        break;
      case "text":
        divider = <div className="altrp-divider" style={style}><span className="altrp-divider-separator" style={styleSeparator}></span><div className="altrp-divider-container-label"><label className='altrp-divider-label'>{this.state.settings.divider_text}</label></div><span className="altrp-divider-separator" style={styleSeparator}></span></div>
        switch (this.state.settings.text_style_position) {
          case "left":
            labelStyle = { marginRight: this.state.settings.text_style_spacing.size + this.state.settings.text_style_spacing.unit }
            divider = <div className="altrp-divider" style={style}><div className="altrp-divider-container-label" style={labelStyle}><label className='altrp-divider-label'>{this.state.settings.divider_text}</label></div><span className="altrp-divider-separator" style={styleSeparator}></span></div>
            break;
          case "center":
            labelStyle = { marginRight: this.state.settings.text_style_spacing.size + this.state.settings.text_style_spacing.unit, marginLeft: this.state.settings.text_style_spacing.size + this.state.settings.text_style_spacing.unit }
            divider = <div className="altrp-divider" style={style}><span className="altrp-divider-separator" style={styleSeparator}></span><div className="altrp-divider-container-label" style={labelStyle}><label className='altrp-divider-label'>{this.state.settings.divider_text}</label></div><span className="altrp-divider-separator" style={styleSeparator}></span></div>
            break;
          case "right":
            labelStyle = { marginLeft: this.state.settings.text_style_spacing.size + this.state.settings.text_style_spacing.unit }
            divider = <div className="altrp-divider" style={style}><span className="altrp-divider-separator" style={styleSeparator}></span><div className="altrp-divider-container-label" style={labelStyle}><label className='altrp-divider-label'>{this.state.settings.divider_text}</label></div></div>
            break;
        }
        break;
      case "icon":
        divider = <div className="altrp-divider" style={style}><span className="altrp-divider-separator" style={styleSeparator}></span></div>
        break;
    }
    return divider

  }
}

export default DividerWidget
