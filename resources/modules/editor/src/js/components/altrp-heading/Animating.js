import Rotating from "../animations/text/rotating/Rotating";
import Highlighted from "../animations/text/highlighted/Highlighted";

class Animating extends Component {
  render() {
    let animating = "";

    const settings = this.props.settings;
    const beforeText = this.props.getContent('text_before_animating');
    const afterText = this.props.getContent('text_after_animating');
    const htmlTag = settings.html_tag_animating || "h2";
    const prefix = "heading";
    const text_highlighted_animating = this.props.getContent('text_highlighted_animating')
    if(settings.style_animating === "highlighted") {

      animating = <Highlighted
        shape={settings.shape_animating}
        text={text_highlighted_animating}
        bringToFront={settings.bring_to_front_shape_animating}
        roundedEdges={settings.rounded_edges_shape_animating}
        prefix={prefix}
      />
    } else if(settings.style_animating === "rotating") {

      animating = <Rotating
        type={settings.animation_animating}
        prefix={prefix}
        text={settings.text_rotating_animating}
      />
    }

    return <div className={`${this.props.classes} altrp-heading-animating`}>
      {
        React.createElement(htmlTag, {
          className: "altrp-heading-animating-tag"
        },
          (
            <React.Fragment>
              {
                beforeText ? (
                  <span
                    className={`${this.props.classes} altrp-heading-no-animating-text`}
                    dangerouslySetInnerHTML={{ __html: beforeText }}
                  />
                ) : null
              }
              &nbsp;
              {
                animating
              }
              &nbsp;
              {
                afterText ? (
                  <span
                    className={`${this.props.classes} altrp-heading-no-animating-text`}
                    dangerouslySetInnerHTML={{ __html: afterText }}
                  />
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
