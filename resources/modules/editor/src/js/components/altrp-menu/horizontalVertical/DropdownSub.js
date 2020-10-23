import React, {Component} from "react";
import {iconsManager} from "../../../helpers";
import {Link} from "react-router-dom";
import Divider from "./Divider";

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
    let сlasses = "altrp-nav-menu-ul-dropdown-children-hor-ver";

    if(this.state.list.length === 1) {
      сlasses += " altrp-nav-menu-ul-dropdown-children-hor-ver-only"
    }

    let list = (
      this.props.show ? (
        <div className={сlasses}>
          <ul className="altrp-nav-menu-ul-dropdown-children-hor-ver-ul">
            {
              this.state.list.map((li, idx) => {
                let url = "";
                if(li.link_repeater_menu_layout) {
                  url = li.link_repeater_menu_layout.url
                };

                return (
                  <li
                    className="altrp-nav-menu-ul-dropdown-children-hor-ver-li"
                    onMouseEnter={() => this.showSub(idx)}
                    onMouseLeave={() => this.hideSub(idx)}
                    key={idx}
                  >
                    <Link to={url} className="altrp-nav-menu-li-dropdown-children-hor-ver-li-link">
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
                    </Link>
                    {
                      li.id_repeater_menu_layout ? <DropdownSub
                        chevron={this.props.chevron}
                        settings={this.props.settings}
                        show={li.show} children={li.children}
                        list={this.props.list}
                      /> : ""
                    }
                    <Divider settings={this.props.settings} />
                  </li>
                )
              })
            }
          </ul>
        </div>
      ) : ""
    );
    return list;
  }
};

export default DropdownSub
