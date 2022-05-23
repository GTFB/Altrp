import Tooltip from "./Tooltip";
import getDataByPath from '../../../../../front-app/src/js/functions/getDataByPath'
import isEditor from '../../../../../front-app/src/js/functions/isEditor'
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";

(window.globalDefaults = window.globalDefaults || []).push(`
.altrp-text {
  padding: 0;
  margin: 0;
  opacity: 1;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  line-height: 1.5;
  letter-spacing: 0;
  border-radius: 0;
}

.altrp-text a{
  font-family: "Open Sans", sans-serif;

}
.altrp-text blockquote {
    overflow: hidden;
    padding-right: 1.5em;
    padding-left: 1.5em;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    border-left: solid 5px hsl(0, 0%, 80%);
}
.altrp-text p{
    margin-top: 16px;
    margin-bottom: 16px;
}

.altrp-text img{
    max-width: 100%;
}

.ck.ck-editor__editable_inline{
    padding: 0;
}
`)

class TextWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      tooltipActiveValue: false
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
    this.tooltipActive = this.tooltipActive.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  tooltipActive() {
    if (this.state.tooltipActiveValue) {
      this.setState({
        tooltipActiveValue: !this.state.tooltipActiveValue
      });
    } else {
      setTimeout(() => {
        this.setState({
          tooltipActiveValue: !this.state.tooltipActiveValue
        });
      }, 500);
    }
  }

  changeText(value) {
    let settings = this.props.element.settings;
    settings.text = value;
    this.props.element.setSettings(settings);
    this.props.element.templateNeedUpdate();
  }

  render() {
    let tooltip = (
      <Tooltip
        switch={this.state.settings.text_advanced_tooltip_active || false}
        label={this.state.settings.text_advanced_tooltip_label}
        active={this.state.tooltipActiveValue}
      />
    );
    let tooltipActive = null;
    if (this.state.settings.text_advanced_tooltip_active) {
      tooltipActive = this.tooltipActive;
    }
    let textContent = this.props.element.getSettings('text');
    const content = this.props.element.getLockedSettings('content')

    if (content
      && getDataByPath(content)
      && _.isString(getDataByPath(content))) {
      textContent = getDataByPath(content);
    }
    textContent = isEditor() ?textContent: replaceContentWithData(textContent)
    if (this.props.CKEditor) {
      return (
        <div className={"altrp-text " + (this.state.settings.position_css_classes || "")}
             onKeyDown={e=>e.stopPropagation()}
             id={this.state.settings.position_css_id}>
          <this.props.CKEditor
            changeText={this.changeText}
            text={textContent}
            readOnly={isEditor()}
            textWidget={true}
          />
        </div>
      );
    }

    return React.createElement("div", {
      className:
        "altrp-text ck ck-content " +
        this.state.settings.text_position_css_classes,
      id: this.state.settings.text_position_css_id || "",
      onMouseOver: tooltipActive,
      dangerouslySetInnerHTML: {
        __html: textContent || ""
      },
      // dangerouslySetInnerHTML: activeText,

      onMouseLeave: tooltipActive
    });
  }
}

export default TextWidget;
