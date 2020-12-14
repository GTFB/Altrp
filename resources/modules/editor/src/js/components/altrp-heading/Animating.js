import React, {Component} from 'react';
import Rotating from "../animations/text/rotating/Rotating";

class Animating extends Component {
  render() {
    let animating = "";

    const settings = this.props.settings;
    const beforeText = settings.text_before_animating;
    const afterText = settings.text_after_animating;
    const htmlTag = settings.html_tag_animating || "h2";

    if(settings.style_animating === "highlighted") {

      animating = "highlighted"
    } else if(settings.style_animating === "rotating") {

      animating = <Rotating
        type={settings.animation_animating}
        prefix="heading"
        text={settings.text_rotating_animating}
      />
    }

    return <div className="altrp-heading-animating">
      {
        React.createElement(htmlTag, {
          className: "altrp-heading-animating-tag"
        },
          (
            <React.Fragment>
              {
                beforeText ? (
                  <span dangerouslySetInnerHTML={{ __html: beforeText }}/>
                ) : null
              }
              &nbsp;
              {
                animating
              }
              &nbsp;
              {
                afterText ? (
                  <span dangerouslySetInnerHTML={{ __html: afterText }}/>
                ) : null
              }
            </React.Fragment>
          )
        )
      }
    </div>
  }
}

export default Animating;
