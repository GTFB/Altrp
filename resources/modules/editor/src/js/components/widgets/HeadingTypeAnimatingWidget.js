import Animating from "../altrp-heading/Animating";

(window.globalDefaults = window.globalDefaults || []).push(`
.altrp-heading {
  margin-top: 5px;
  margin-right: 0;
  margin-bottom: 5px;
  margin-left: 0;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
  background-position: top left;
  background-attachment: scroll;
  background-repeat: repeat;
}

.altrp-heading-advanced-wrapper {
  position: absolute;
  left: 0;
  margin: 0;
  z-index: -1;
  width: 100%;
  top: 0;
  box-sizing: border-box;
}

.altrp-heading-advanced {
  display: inline-block;
  margin: 0;
}

.altrp-heading-advanced-main-fill {
  background-clip: unset;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-transition-property: prop;
  -moz-transition-property: prop;
  -ms-transition-property: prop;
  -o-transition-property: prop;
  transition-property: prop;
}

.altrp-heading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.altrp-heading-wrapper {
  display: flex;
}

.altrp-heading-wrapper-sub-top {
  flex-direction: column-reverse;
}

.altrp-heading-sub {
  margin: 0;
  display: flex;
  padding: 0;
}

.altrp-heading-sub-link {
  display: flex;
}

.altrp-heading-sub-container-link {
  margin: 0;
}

.altrp-heading-wrapper-sub-left {
  flex-direction: row-reverse;
  align-items: center;
}

.altrp-heading-wrapper-sub-right {
  flex-direction: row;
  align-items: center;
}

.altrp-heading-animating-tag {
  display: flex;
}

.altrp-animating-rotating {
  display: flex;
}

`)

class HeadingTypeAnimatingWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  /**
   * Получить css классы для heading type animating widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return <Animating
      classes={classes}
      settings={this.state.settings}
      getContent={this.getLockedContent.bind(this)}
    />
  }
}

export default HeadingTypeAnimatingWidget
