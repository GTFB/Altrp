import React, {Component} from "react";
import AltrpLink from "../../altrp-link/AltrpLink";
import Divider from "../Divider";

class DropdownSub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };

    this.setList = this.setList.bind(this);
    this.showSub = this.showSub.bind(this);
    this.hideSub = this.hideSub.bind(this)
  }

  setList() {
    let list = [];
    if(this.props.children) {
      this.props.list.forEach(li => {
        this.props.children.forEach(id => {
          let liContainer = li;
          if(li.id === id) {
            liContainer.show = false;
            list.push(li);
          }
        })

      })
    }

    this.setState({ list })
  }

  showSub(id) {
    this.setState((state) => {
      let list = state.list;
      list[id].show = true;
      return {
        list
      }
    })
  }

  hideSub(id) {
    this.setState((state) => {
      let list = state.list;
      list[id].show = false;
      return {
        list
      }
    })
  }

  componentDidMount() {
    this.setList();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.list !== this.props.list) {
      this.setList()
    }
  }

  render() {
    let classes = "altrp-nav-menu-ul-dropdown-children-hor-ver";

    if(this.state.list.length === 1) {
      classes += " altrp-nav-menu-ul-dropdown-children-hor-ver-only"
    }

    switch (this.props.settings.alignment_dropdown_hor_ver_menu_section) {
      case "left":
        classes += " altrp-nav-menu-ul-dropdown-children-hor-ver-left";
        break;
      case "center":
        classes += " altrp-nav-menu-ul-dropdown-children-hor-ver-center";
        break;
      case "right":
        classes += " altrp-nav-menu-ul-dropdown-children-hor-ver-right";
        break
    }

    switch (this.props.settings.content_alignment_dropdown_hor_ver_menu_section) {
      case "center":
        classes += " altrp-nav-menu-ul-dropdown-sub-hor-ver-center";
        break;
      case "right":
        classes += " altrp-nav-menu-ul-dropdown-sub-hor-ver-right";
        break
      case "spaceBetween":
        classes += " altrp-nav-menu-ul-dropdown-sub-hor-ver-space-between";
        break
      case "spaceBetweenReverse":
        classes += " altrp-nav-menu-ul-dropdown-sub-hor-ver-space-between-reverse";
        break
    }

    return (
      this.props.show ? (
        <div className={classes}>
          <ul className="altrp-nav-menu-ul-dropdown-children-hor-ver-ul">
            {
              this.state.list.map((li, idx) => {

                return (
                  <li
                    className="altrp-nav-menu-ul-dropdown-children-hor-ver-li"
                    onMouseEnter={() => this.showSub(idx)}
                    onMouseLeave={() => this.hideSub(idx)}
                    key={idx}
                  >
                    <AltrpLink link={li.link_repeater_menu_layout}
                               className="altrp-nav-menu-li-dropdown-children-hor-ver-li-link">
                      <div className="altrp-nav-menu-li-dropdown-children-hor-ver-link-label">
                        {li.label_repeater_menu_layout}
                      </div>
                      {
                        li.id_repeater_menu_layout ? (
                          // altrp-nav-menu-li-link-icon-active
                          <div className="altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon">
                            {
                              this.props.chevron
                            }
                          </div>
                        ) : ""
                      }
                    </AltrpLink>
                    {
                      li.id_repeater_menu_layout ? <DropdownSub
                        chevron={this.props.chevron}
                        settings={this.props.settings}
                        show={li.show} children={li.children}
                        list={this.props.list}
                      /> : ""
                    }
                    <Divider settings={this.props.settings}/>
                  </li>
                )
              })
            }
          </ul>
        </div>
      ) : ""
    );
  }
};

export default DropdownSub
