import React, { Component } from 'react'
import WideScreen from "../../svgs/widescreen.svg"
import Desktop from "../../svgs/desktop.svg"
import Laptop from "../../svgs/laptop.svg"
import Tablet from "../../svgs/tablet.svg"
import BigPhoneScreen from "../../svgs/bigphonescreen.svg"
import SmallPhoneScreen from "../../svgs/smallphonescreen.svg"



class ResponsiveDdMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: [
        { icon: Desktop, id: 1 },
        { icon: WideScreen, id: 2 },
        { icon: Laptop, id: 3 },
        { icon: Tablet, id: 4 },
        { icon: BigPhoneScreen, id: 5 },
        { icon: SmallPhoneScreen, id: 6 },
      ],
      open: false,
    }
  };

  toggleOpen() {
    this.setState({
      open: !this.state.open,
    })
  };

  render() {

    return (
      <div className="screens-container">
        <div onClick={() => this.toggleOpen()} className="screens-header"><Desktop /></div>
        {
          this.state.screens.map(screen => {
            let Component = screen.icon
            return <div className={"screens-item " + (this.state.open ? 'screens-item__open' : 'screens-item__close')}>
              <Component key={screen.id} />
            </div>
          })
        }
      </div>
    )
  }
};

export default ResponsiveDdMenu;
