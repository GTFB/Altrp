import AltrpLink from "../altrp-link/AltrpLink";
import parseURLTemplate from "../../../../../front-app/src/js/functions/parseURLTemplate";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import React, {Component} from 'react';

class LinkMenu extends Component {
  render() {
    const {defaultChildren, link, modelId, modelData, children, className} = this.props;
    let linkContainer = React.cloneElement(defaultChildren, {}, children);

    if(link) {
      let linkProps = {
        rel: link.noFollow ? "nofollow" : null,
        href: link.url,
        dangerouslySetInnerHTMLCondition: false,
        className: className,
      };

      linkProps.tag = link.tag || "a";
      // linkProps.creativelink = this.getContent("heading_settings_html_tag") !== "p" ? this.getContent("creative_link_controller") : null;

      if(link.openInNew){
        linkProps.target = '_black';
      }

      if ((link.tag === 'Link') && ! isEditor()) {
        linkProps.to = link.url.replace(':id', modelId || '');
        linkProps.href = link.url.replace(':id', modelId || '');
      }

      if(_.isObject(this.props.modelData)){
        linkProps.to = parseURLTemplate(link.url, modelData);
        linkProps.href = parseURLTemplate(link.url, modelData);
      }

      linkContainer = (
        <AltrpLink {...linkProps}>
          {
            children
          }
        </AltrpLink>
      );
    }

    return linkContainer
  }
}

export default LinkMenu;
