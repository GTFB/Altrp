import React, {Component} from 'react';

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
      let text = "rotating";

      const textArray = settings.text_rotating_animating.split("\n");

      function eraseAll(textErase, classNames) {
        const eraseText = React.cloneElement(textErase, { className: textErase + (classNames ? " " + classNames : "") })
      }

      switch (settings.animation_animating) {
        case "typing":
          text
          break
      }


      animating = text
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
              {
                animating
              }
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
