import React, {Component} from "react";
import AltrpPortal from "../../altrp-portal/AltrpPortal";
import DropdownSub from "./DropdownSub";
import AltrpLink from "../../altrp-link/AltrpLink";
import Divider from "../Divider";
import LinkMenu from "../LinkMenu";
import {isEditor} from "../../../../../../front-app/src/js/helpers";

class Dropdown extends Component {
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

  componentDidMount() {
    this.setList()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.list !== this.props.list) {
      this.setList()
    }
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

  render() {
    let childrenRef = "";

    //ищет нужный li из htmlCollection через data-key
    if(this.props.childrenRef.current) {
      let children = this.props.childrenRef.current.children;
      for(let idx = 0; idx < children.length; idx++) {
        if(children[idx].dataset.key === this.props.id) {
          childrenRef = children[idx];
        }
      }
    }

    let classes = "altrp-nav-menu-ul-dropdown-hor-ver";

    switch (this.props.settings.content_alignment_dropdown_hor_ver_menu_section) {
      case "center":
        classes += " altrp-nav-menu-ul-dropdown-hor-ver-center";
        break;
      case "right":
        classes += " altrp-nav-menu-ul-dropdown-hor-ver-right";
        break
      case "spaceBetween":
        classes += " altrp-nav-menu-ul-dropdown-hor-ver-space-between";
        break
      case "spaceBetweenReverse":
        classes += " altrp-nav-menu-ul-dropdown-hor-ver-space-between-reverse";
        break
    }

    return (
      <AltrpPortal position={this.props.settings.alignment_dropdown_hor_ver_menu_section} id={this.props.idElement} childrenRef={childrenRef} show={this.props.show}>
        <div className={classes}>
          <ul className="altrp-nav-menu-ul-dropdown-hor-ver-ul">
            {
              this.state.list.map((li, idx) => {
                let link = <LinkMenu
                  defaultChildren={(<div className="altrp-nav-menu-ul-dropdown-hor-ver-li-link"/>)}
                  modelData={this.props.modelData}
                  modelId={this.props.modelId || null}
                  link={li.link_repeater_menu_layout}
                  className="altrp-nav-menu-ul-dropdown-hor-ver-li-link"
                >
                  <div className="altrp-nav-menu-li-dropdown-hor-ver-link-label">
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
                </LinkMenu>;

                return (
                  <li
                    className="altrp-nav-menu-ul-dropdown-hor-ver-li"
                    onMouseEnter={() => this.showSub(idx)}
                    onMouseLeave={() => this.hideSub(idx)}
                    key={idx}
                  >
                    {
                      link
                    }
                    {
                      li.id_repeater_menu_layout ?
                        <DropdownSub
                          modelId={this.props.modelId}
                          modelData={this.props.modelData}
                          chevron={this.props.chevron}
                          settings={this.props.settings}
                          show={li.show}
                          children={li.children}
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
      </AltrpPortal>
    );
  }
};

export default Dropdown
