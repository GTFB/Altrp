import styled from 'styled-components';
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  simplePropertyStyled,
  colorPropertyStyled,
  borderWidthStyled,
  borderRadiusStyled,
  columnGapStyled,
  opacityStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

const MenuComponent = styled.div`

  .bp3-menu {
    background: #ffffff;
    border-radius: 3px;
    color: #182026;
    list-style: none;
    margin: 0;
    min-width: 180px;
    padding: 5px;
    text-align: left;
  }

  .bp3-menu {
    background: #ffffff;
    border-radius: 3px;
    color: #182026;
    list-style: none;
    margin: 0;
    min-width: 180px;
    padding: 5px;
    text-align: left;
  }

  .bp3-menu-divider {
    border-top: 1px solid rgba(16, 22, 26, 0.15);
    display: block;
    margin: 5px;
  }

  .bp3-dark .bp3-menu-divider {
    border-top-color: rgba(255, 255, 255, 0.15);
  }

  .bp3-menu-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 2px;
    color: inherit;
    line-height: 20px;
    padding: 5px 7px;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .bp3-menu-item > * {
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  .bp3-menu-item > .bp3-fill {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
  }

  .bp3-menu-item::before,
  .bp3-menu-item > * {
    margin-right: 7px;
  }

  .bp3-menu-item:empty::before,
  .bp3-menu-item > :last-child {
    margin-right: 0;
  }

  .bp3-menu-item > .bp3-fill {
    word-break: break-word;
  }

  .bp3-menu-item:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-menu-item {
    background-color: rgba(167, 182, 194, 0.3);
    cursor: pointer;
    text-decoration: none;
  }

  .bp3-menu-item.bp3-disabled {
    background-color: inherit;
    color: rgba(92, 112, 128, 0.6);
    cursor: not-allowed;
  }

  .bp3-dark .bp3-menu-item {
    color: inherit;
  }

  .bp3-dark .bp3-menu-item:hover, .bp3-dark .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-menu-item, .bp3-submenu .bp3-dark .bp3-popover-target.bp3-popover-open > .bp3-menu-item {
    background-color: rgba(138, 155, 168, 0.15);
    color: inherit;
  }

  .bp3-dark .bp3-menu-item.bp3-disabled {
    background-color: inherit;
    color: rgba(167, 182, 194, 0.6);
  }

  .bp3-menu-item.bp3-intent-primary {
    color: #106ba3;
  }

  .bp3-menu-item.bp3-intent-primary .bp3-icon {
    color: inherit;
  }

  .bp3-menu-item.bp3-intent-primary::before, .bp3-menu-item.bp3-intent-primary::after,
  .bp3-menu-item.bp3-intent-primary .bp3-menu-item-label {
    color: #106ba3;
  }

  .bp3-menu-item.bp3-intent-primary:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-primary.bp3-menu-item, .bp3-menu-item.bp3-intent-primary.bp3-active {
    background-color: #137cbd;
  }

  .bp3-menu-item.bp3-intent-primary:active {
    background-color: #106ba3;
  }

  .bp3-menu-item.bp3-intent-primary:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-primary.bp3-menu-item, .bp3-menu-item.bp3-intent-primary:hover::before, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-primary.bp3-menu-item::before, .bp3-menu-item.bp3-intent-primary:hover::after, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-primary.bp3-menu-item::after,
  .bp3-menu-item.bp3-intent-primary:hover .bp3-menu-item-label,
  .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-primary.bp3-menu-item .bp3-menu-item-label, .bp3-menu-item.bp3-intent-primary:active, .bp3-menu-item.bp3-intent-primary:active::before, .bp3-menu-item.bp3-intent-primary:active::after,
  .bp3-menu-item.bp3-intent-primary:active .bp3-menu-item-label, .bp3-menu-item.bp3-intent-primary.bp3-active, .bp3-menu-item.bp3-intent-primary.bp3-active::before, .bp3-menu-item.bp3-intent-primary.bp3-active::after,
  .bp3-menu-item.bp3-intent-primary.bp3-active .bp3-menu-item-label {
    color: #ffffff;
  }

  .bp3-menu-item.bp3-intent-success {
    color: #0d8050;
  }

  .bp3-menu-item.bp3-intent-success .bp3-icon {
    color: inherit;
  }

  .bp3-menu-item.bp3-intent-success::before, .bp3-menu-item.bp3-intent-success::after,
  .bp3-menu-item.bp3-intent-success .bp3-menu-item-label {
    color: #0d8050;
  }

  .bp3-menu-item.bp3-intent-success:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-success.bp3-menu-item, .bp3-menu-item.bp3-intent-success.bp3-active {
    background-color: #0f9960;
  }

  .bp3-menu-item.bp3-intent-success:active {
    background-color: #0d8050;
  }

  .bp3-menu-item.bp3-intent-success:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-success.bp3-menu-item, .bp3-menu-item.bp3-intent-success:hover::before, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-success.bp3-menu-item::before, .bp3-menu-item.bp3-intent-success:hover::after, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-success.bp3-menu-item::after,
  .bp3-menu-item.bp3-intent-success:hover .bp3-menu-item-label,
  .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-success.bp3-menu-item .bp3-menu-item-label, .bp3-menu-item.bp3-intent-success:active, .bp3-menu-item.bp3-intent-success:active::before, .bp3-menu-item.bp3-intent-success:active::after,
  .bp3-menu-item.bp3-intent-success:active .bp3-menu-item-label, .bp3-menu-item.bp3-intent-success.bp3-active, .bp3-menu-item.bp3-intent-success.bp3-active::before, .bp3-menu-item.bp3-intent-success.bp3-active::after,
  .bp3-menu-item.bp3-intent-success.bp3-active .bp3-menu-item-label {
    color: #ffffff;
  }

  .bp3-menu-item.bp3-intent-warning {
    color: #bf7326;
  }

  .bp3-menu-item.bp3-intent-warning .bp3-icon {
    color: inherit;
  }

  .bp3-menu-item.bp3-intent-warning::before, .bp3-menu-item.bp3-intent-warning::after,
  .bp3-menu-item.bp3-intent-warning .bp3-menu-item-label {
    color: #bf7326;
  }

  .bp3-menu-item.bp3-intent-warning:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-warning.bp3-menu-item, .bp3-menu-item.bp3-intent-warning.bp3-active {
    background-color: #d9822b;
  }

  .bp3-menu-item.bp3-intent-warning:active {
    background-color: #bf7326;
  }

  .bp3-menu-item.bp3-intent-warning:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-warning.bp3-menu-item, .bp3-menu-item.bp3-intent-warning:hover::before, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-warning.bp3-menu-item::before, .bp3-menu-item.bp3-intent-warning:hover::after, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-warning.bp3-menu-item::after,
  .bp3-menu-item.bp3-intent-warning:hover .bp3-menu-item-label,
  .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-warning.bp3-menu-item .bp3-menu-item-label, .bp3-menu-item.bp3-intent-warning:active, .bp3-menu-item.bp3-intent-warning:active::before, .bp3-menu-item.bp3-intent-warning:active::after,
  .bp3-menu-item.bp3-intent-warning:active .bp3-menu-item-label, .bp3-menu-item.bp3-intent-warning.bp3-active, .bp3-menu-item.bp3-intent-warning.bp3-active::before, .bp3-menu-item.bp3-intent-warning.bp3-active::after,
  .bp3-menu-item.bp3-intent-warning.bp3-active .bp3-menu-item-label {
    color: #ffffff;
  }

  .bp3-menu-item.bp3-intent-danger {
    color: #c23030;
  }

  .bp3-menu-item.bp3-intent-danger .bp3-icon {
    color: inherit;
  }

  .bp3-menu-item.bp3-intent-danger::before, .bp3-menu-item.bp3-intent-danger::after,
  .bp3-menu-item.bp3-intent-danger .bp3-menu-item-label {
    color: #c23030;
  }

  .bp3-menu-item.bp3-intent-danger:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-danger.bp3-menu-item, .bp3-menu-item.bp3-intent-danger.bp3-active {
    background-color: #db3737;
  }

  .bp3-menu-item.bp3-intent-danger:active {
    background-color: #c23030;
  }

  .bp3-menu-item.bp3-intent-danger:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-danger.bp3-menu-item, .bp3-menu-item.bp3-intent-danger:hover::before, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-danger.bp3-menu-item::before, .bp3-menu-item.bp3-intent-danger:hover::after, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-danger.bp3-menu-item::after,
  .bp3-menu-item.bp3-intent-danger:hover .bp3-menu-item-label,
  .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-intent-danger.bp3-menu-item .bp3-menu-item-label, .bp3-menu-item.bp3-intent-danger:active, .bp3-menu-item.bp3-intent-danger:active::before, .bp3-menu-item.bp3-intent-danger:active::after,
  .bp3-menu-item.bp3-intent-danger:active .bp3-menu-item-label, .bp3-menu-item.bp3-intent-danger.bp3-active, .bp3-menu-item.bp3-intent-danger.bp3-active::before, .bp3-menu-item.bp3-intent-danger.bp3-active::after,
  .bp3-menu-item.bp3-intent-danger.bp3-active .bp3-menu-item-label {
    color: #ffffff;
  }

  .bp3-menu-item::before {
    font-family: "Icons16", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    margin-right: 7px;
  }

  .bp3-menu-item::before,
  .bp3-menu-item > .bp3-icon {
    color: #5c7080;
    margin-top: 2px;
  }

  .bp3-menu-item .bp3-menu-item-label {
    color: #5c7080;
  }

  .bp3-menu-item:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-menu-item {
    color: inherit;
  }

  .bp3-menu-item.bp3-active, .bp3-menu-item:active {
    background-color: rgba(115, 134, 148, 0.3);
  }

  .bp3-menu-item.bp3-disabled {
    background-color: inherit !important;
    color: rgba(92, 112, 128, 0.6) !important;
    cursor: not-allowed !important;
    outline: none !important;
  }

  .bp3-menu-item.bp3-disabled::before,
  .bp3-menu-item.bp3-disabled > .bp3-icon,
  .bp3-menu-item.bp3-disabled .bp3-menu-item-label {
    color: rgba(92, 112, 128, 0.6) !important;
  }

  .bp3-large .bp3-menu-item {
    font-size: 16px;
    line-height: 22px;
    padding: 9px 7px;
  }

  .bp3-large .bp3-menu-item .bp3-icon {
    margin-top: 3px;
  }

  .bp3-large .bp3-menu-item::before {
    font-family: "Icons20", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    margin-right: 10px;
    margin-top: 1px;
  }

  button.bp3-menu-item {
    background: none;
    border: none;
    text-align: left;
    width: 100%;
  }

  .bp3-menu-header {
    border-top: 1px solid rgba(16, 22, 26, 0.15);
    display: block;
    margin: 5px;
    cursor: default;
    padding-left: 2px;
  }

  .bp3-dark .bp3-menu-header {
    border-top-color: rgba(255, 255, 255, 0.15);
  }

  .bp3-menu-header:first-of-type {
    border-top: none;
  }

  .bp3-menu-header > h6 {
    color: #182026;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    line-height: 17px;
    margin: 0;
    padding: 10px 7px 0 1px;
  }

`;

export default MenuComponent;
