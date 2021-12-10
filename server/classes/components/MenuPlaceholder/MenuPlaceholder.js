import styled from "styled-components";
import React from "react";
import SkeletonPlaceholder from "../SkeletonPlaceholder";
import {mbParseJSON} from "../../../../resources/modules/front-app/src/js/helpers";

const Container = styled.ul`
  display: flex;

 ${props => {
  let styles = "";

  if (props.type === "vertical") {
    styles += "flex-direction: column;";
  } else if (styles === "horizontal") {
    styles += "flex-direction: row;";
  }

  if (props.gap) {
    styles += `grid-gap: ${props.gap};`
  }
  return styles
}}
`

const MenuPlaceholder = props => {
  const divStyles = {
    position: 'relative',
    width: props.element.getResponsiveSetting('skeleton_width') || '100%',
    height: props.element.getResponsiveSetting('skeleton_height') || '30px',
  };

  const toggleButton = props.element.getResponsiveSetting("button")

  const guid = props.element.getResponsiveSetting('menu');

  const menus = window.appStore.getState().altrpMenus;
  if (guid) {
    const menu = menus.find((m) => {
      return m.guid === guid
    });

    const items = mbParseJSON(menu.children);
    const type = props.element.getResponsiveSetting("type", "", "vertical");
    const gap = props.element.getResponsiveSetting("gap");

    if(!toggleButton) {
      return <Container gap={gap} type={type} className="bp3-menu altrp-menu">
        {
          items.map((i) => {

            return (
              <SkeletonMenuItem className={i?.children?.length ? 'bp3-submenu' : ''}
                                item={i}
                                key={i.id}/>
            )
          })
        }
      </Container>
    } else {
      let toggle_icon = JSON.parse(menu.settings || "")?.toggle_icon || ''

      return <span className="altrp-menu-popover-clone altrp-popover bp3-popover2-target">
        <button className="bp3-button altrp-menu-toggle">
        <span className="bp3-button-text">
          <span className="altrp-menu-item__icon" dangerouslySetInnerHTML={{__html: toggle_icon}}/>
        </span>
        </button>
      </span>
    }
  } else {
    return <SkeletonPlaceholder {...props}/>
  }

}

const SkeletonMenuItem =
  ({
     item
   }) => {
    let __html = `
    ${`<span class="altrp-menu-item__icon">${item.icon || ''}</span>`}
    <div class="bp3-fill bp3-text-overflow-ellipsis">${item.label}</div>
    ${item?.children?.length ? `
      <span class="bp3-icon bp3-icon-caret-right">
        <svg data-icon="caret-right" width="16" height="16" viewBox="0 0 16 16">
        <desc>Open sub menu</desc>
        <path d="M11 8c0-.15-.07-.28-.17-.37l-4-3.5A.495.495 0 006 4.5v7a.495.495 0 00.83.37l4-3.5c.1-.09.17-.22.17-.37z" fill-rule="evenodd">
        </path>
        </svg>
      </span>` : ''}
    `;
    let link = <a href={item.url} className="bp3-menu-item altrp-menu-item" dangerouslySetInnerHTML={{__html: __html}}/>
    return (
      <li className={item?.children?.length ? 'bp3-submenu' : ''} key={item.id}>
        {link}
      </li>
    )
  }

export default MenuPlaceholder;

