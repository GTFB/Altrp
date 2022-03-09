import getContent from "../getContent";
import getResponsiveSetting from "../getResponsiveSetting"

export default function renderHeadingTypeAnimating(settings, device, context) {
  
  let animating = "";
  const beforeText = getContent(settings, context, 'text_before_animating', device);
  const afterText = getContent(settings, context, 'text_after_animating', device);
  const htmlTag = getResponsiveSetting(settings, 'html_tag_animating', device, 'h2');
  const prefix = "heading";
  const text_highlighted_animating = getContent(settings, context, 'text_highlighted_animating', device)
  
  const style_animating = getResponsiveSetting(settings, 'style_animating', device, 'h2');

  let text = text_highlighted_animating

  if (style_animating === "rotating") {
    text = text_highlighted_animating.split('\n')[0]
  }

  return `
    <div class="altrp-heading-animating">
      <${htmlTag} class="altrp-heading-animating-tag">
        ${beforeText ? `
            <span class="altrp-heading-no-animating-text">
              ${beforeText}
            </span>
          ` : ''
        }
        &nbsp;
        ${animating}
        &nbsp;
        ${afterText ? `
            <span class="altrp-heading-no-animating-text">
              ${afterText}
            </span>
          ` : ''
        }
      </div>
    </div>
  `
}