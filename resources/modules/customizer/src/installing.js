import Chevron from "./../../editor/src/svgs/chevron.svg"
import {Component} from "react";
import {Handle} from "react-flow-renderer";
import "./js/helpers/nodeDecorator";
import {assetsShow, assetsToggle} from "../../editor/src/js/store/assets-browser/actions";
import MediaController from "./js/components/MediaController";
window.ReactComponent = Component

window.customizerComponents = window.customizerComponents || {}

window.customizerComponents.icons = {
  Chevron
}

window.customizerComponents.elements = {
  Handle,
  MediaController,
}
window.customizerComponents.functions = {
}

window.storeActions = window.storeActions || {}
window.storeActions.assetsShow = assetsShow
window.storeActions.assetsToggle = assetsToggle
