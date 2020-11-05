import React, {Component} from 'react';
import AltrpLink from "../../altrp-link/AltrpLink";
import AltrpImage from "../../altrp-image/AltrpImage";
import {iconsManager} from "../../../helpers";

class DropdownSub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      list: []
    };

    this.changeShow = this.changeShow.bind(this);
    this.setList = this.setList.bind(this);
  }

  setList() {
    let list = [];
    if(this.props.li.children) {
      this.props.list.forEach(li => {
        this.props.li.children.forEach(id => {
          if(li.id === id) {
            list.push(li);
          }
        })

      })
    }

    this.setState({ list })
  }

  componentDidMount() {
    this.setList()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.list !== this.props.list) {
      this.setList()
    }
  }

  changeShow() {
    this.setState((state) => ({ show: !state.show }))
  }

  render() {
    return (
      <div className="altrp-nav-menu-dropdown-sub">
        <div className="altrp-nav-menu-li-link altrp-nav-menu-dropdown-sub-label" onClick={this.changeShow}>
          <span>
            {
              this.props.li.label_repeater_menu_layout
            }
          </span>
          <AltrpImage
            image={this.props.settings.chevron_dropdown_menu_section}
            default={{
              assetType: "icon",
              name: 'chevron',
              iconComponent: iconsManager().renderIcon('chevron')
            }}
            className={"altrp-nav-menu-li-link-chevron-dropdown" + (this.state.show ? " altrp-nav-menu-li-link-active-chevron-dropdown" : "")}
          />
        </div>
        <div className={"altrp-nav-menu-dropdown-sub-content altrp-nav-menu-ul-wrapper altrp-nav-menu-dropdown-content" + (!this.state.show ? " altrp-nav-menu-dropdown-content-hide" : " altrp-nav-menu-dropdown-content-show")}>
          <ul className="altrp-nav-menu-ul">
            {
              this.state.list.map((li, idx) => {
                return <li className="altrp-nav-menu-li" key={idx}>
                  {!li.id_repeater_menu_layout ? (
                    <React.Fragment>
                      <AltrpLink link={li.link_repeater_menu_layout} className="altrp-nav-menu-li-link altrp-nav-menu-li-link-label">
                        {
                          li.label_repeater_menu_layout
                        }
                      </AltrpLink>
                      {
                        this.props.settings.divider_switch_dropdown_menu_section ? <div className="altrp-nav-menu-dropdown-content-divider"/> : ""
                      }
                    </React.Fragment>
                  ) : (
                    <DropdownSub settings={this.props.settings} divider={false} list={this.props.list} li={li}/>
                  )
                  }
                </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default DropdownSub;
