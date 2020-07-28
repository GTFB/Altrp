import React, { Component } from 'react'
import WideScreen from "../../svgs/widescreen.svg"
import Desktop from "../../svgs/desktop.svg"
import Laptop from "../../svgs/laptop.svg"
import Tablet from "../../svgs/tablet.svg"
import BigPhoneScreen from "../../svgs/bigphonescreen.svg"
import SmallPhoneScreen from "../../svgs/smallphonescreen.svg"
import { connect } from 'react-redux'
import { setCurrentScreen } from "../store/responsive-switcher/actions"
import { getCurrentScreen } from '../store/store'

class ResponsiveDdMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: [
        { icon: Desktop, id: 1, width: '' },
        { icon: WideScreen, id: 2, width: '1440px' },
        { icon: Laptop, id: 3, width: '1024px' },
        { icon: Tablet, id: 4, width: '768px' },
        { icon: BigPhoneScreen, id: 5, width: '450px' },
        { icon: SmallPhoneScreen, id: 6, width: '320px' },
      ],
      open: false,
    }
  };
  toggleOpen() {
    this.setState({
      open: !this.state.open,
    })
  };
  setCurrentScreen(screen) {
    this.props.setCurrentScreen(screen)
    this.setState({
      open: !this.state.open,
    })
  }
  render() {
    let currentScreen = getCurrentScreen();
    return (
      <div className="screens-container">
        <span onClick={() => this.toggleOpen()} className={"screens-title " + (this.state.open ? 'screens-title-open' : '')}><Desktop /></span>
        <ul className={"screens-list " + (this.state.open && 'screens-list__open')} >
          {
            this.state.screens.map(screen => {
              let Component = screen.icon
              return <li className="screens-list__item" key={screen.id}><Component onClick={() => this.setCurrentScreen(screen)} /></li>
            })
          }
        </ul>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen,
  }
}

export default connect(mapStateToProps, { setCurrentScreen })(ResponsiveDdMenu);
