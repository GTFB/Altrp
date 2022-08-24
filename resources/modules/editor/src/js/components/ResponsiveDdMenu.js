import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentScreen } from "../store/responsive-switcher/actions"
import {getTemplateType, iconsManager} from "../helpers"
import CONSTANTS from '../consts'

class ResponsiveDdMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: [...CONSTANTS.SCREENS_ADDITIONAL, ...CONSTANTS.SCREENS],
      open: false,
    }
  };
  toggleOpen() {
    this.setState({
      open: !this.state.open,
    })
  };
  setCurrentScreen(screen) {
    this.props.setCurrentScreen(screen);
    this.setState({
      open: !this.state.open,
    })
  }
  render() {
    if(getTemplateType() === 'email'){
      return null;
    }
    return (
      <div className="screens-container">
        <span onClick={() => this.toggleOpen()} className={"screens-title " + (this.state.open ? 'screens-title-open' : '')}>
          {
            iconsManager().renderIcon(this.props.currentScreen.icon)
          }
        </span>
        <div className={"screens-list " + (this.state.open ? 'screens-list__open' : '')} >
          {
            this.state.screens.map(screen => {
              return <button onClick={() => this.setCurrentScreen(screen)} className={"screens-list__item " + (this.props.currentScreen.id === screen.id ? 'screens-list__item-active' : '')} key={screen.id}>{iconsManager().renderIcon(screen.icon)}</button>
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen,
  }
}

export default connect(mapStateToProps, { setCurrentScreen })(ResponsiveDdMenu);
