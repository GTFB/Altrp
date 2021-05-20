import styled from 'styled-components';
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import { typographicControllerToStyles } from "../../../../../../front-app/src/js/helpers/styles";

const TextComponent = styled.div`
  && .altrp-text {
  ${props => {

    const { settings } = props;
    let styles = '';

    let typographic;

    if (settings !== undefined) {
      typographic = getResponsiveSetting(settings, 'text_style_font_typographic')
    }

    if (typographic) {
      styles += typographicControllerToStyles(typographic);
    }

    return styles;
  }
    }
  }
  & .altrp-text img{
    max-width: 100%;
  }
  & .ck.ck-editor__editable_inline{
    padding: 0;
  }
`;

export default TextComponent;