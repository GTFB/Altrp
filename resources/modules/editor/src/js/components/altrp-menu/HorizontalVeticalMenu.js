import React, {Component} from 'react';
import { iconsManager } from "../../helpers";
import {Link} from "react-router-dom";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
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

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  // }
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
    return (
      <div className="altrp-nav-menu-ul-dropdown-hor-ver">
        <ul className="altrp-nav-menu-ul-dropdown-hor-ver-ul">
          {
            this.state.list.map((li, idx) => {
              let url = "";
              if(li.link_repeater_menu_layout) {
                url = li.link_repeater_menu_layout.url
              }

              return (
                <li
                  className="altrp-nav-menu-ul-dropdown-hor-ver-li"
                  onMouseEnter={() => this.showSub(idx)}
                  onMouseLeave={() => this.hideSub(idx)}
                  key={idx}
                >
                  <Link to={url} className="altrp-nav-menu-ul-dropdown-hor-ver-li-link">
                    <div className="altrp-nav-menu-li-dropdown-hor-ver-link-label">
                      {li.label_repeater_menu_layout}
                    </div>
                    {
                      li.id_repeater_menu_layout ? (
                        // altrp-nav-menu-li-link-icon-active
                        <div className="altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon">
                          {
                            iconsManager().renderIcon('chevron')
                          }
                        </div>
                      ) : ""
                    }
                  </Link>
                  {
                    li.id_repeater_menu_layout ? <DropdownSub show={li.show} children={li.children} list={this.props.list}/> : ""
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

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
    this.setList()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.list !== this.props.list) {
      this.setList()
    }
  }

  render() {
    let list = (
      this.props.show ? (
        <div className="altrp-nav-menu-ul-dropdown-children-hor-ver">
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
                      <div className="altrp-nav-menu-li-dropdown-hor-ver-link-label">
                        {li.label_repeater_menu_layout}
                      </div>
                      {
                        li.id_repeater_menu_layout ? (
                          // altrp-nav-menu-li-link-icon-active
                          <div className="altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon">
                            {
                              iconsManager().renderIcon('chevron')
                            }
                          </div>
                        ) : ""
                      }
                    </Link>
                    {
                      li.id_repeater_menu_layout ? <DropdownSub show={li.show} children={li.children} list={this.props.list}/> : ""
                    }
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

class HorizontalVeticalMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: props.settings.repeater_menu_layout,
      dropdowns: []
    };

    this.setStateList = this.setStateList.bind(this)
  }

  setStateList() {
    this.setState((state) => {
      let list = this.props.settings.repeater_menu_layout;
      list.forEach(liParent => {
        if(liParent.id_repeater_menu_layout) {
          let children = [];
          list.forEach(li => {
            if(liParent.id !== li.id) {
              if(li.parent_id_repeater_menu_layout) {
                if(li.parent_id_repeater_menu_layout === liParent.id_repeater_menu_layout) {
                  children.push(li.id);
                }
              }
            }
          });
          liParent.children = children
        }
      });
      return {list}
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let propsRepeater = this.props.settings.repeater_menu_layout;

    if(prevState.list.length !== propsRepeater.length) {
      this.setStateList()
    } else {
      let changes = propsRepeater.forEach((li, idx) => {
        if(li !== prevState.list[idx]) {
          this.setStateList()
        }
      })
    };
  }

  render() {
    let layout = this.props.settings.menu_layout;

    let classesLi = "altrp-nav-menu-li";

    let stylesUl = {};
    let stylesLi = {};
    let stylesLink = {};

    function ifHorElseVer(horStyles, verStyles) {
      if (layout === "horizontal") {
        stylesUl = horStyles
      } else {
        stylesLink = verStyles
      }
    }
    switch (this.props.settings.hor_ver_align_menu_layout) {
      case "start":
        ifHorElseVer({ justifyContent: "flex-start" }, { justifyContent: "flex-start" });
        break;
      case "center":
        ifHorElseVer({ justifyContent: "center" }, { justifyContent: "center" });
        break;
      case "end":
        ifHorElseVer({ justifyContent: "flex-end" }, { justifyContent: "flex-end" });
        break;
      case "stretch":
        stylesLi = { flexGrow: 1 };
        break
    }

    let pointerVariant = this.props.settings.hor_ver_pointer_menu_layout;

    switch (pointerVariant) {
      case "none":
        break;
      case "overLine":
        classesLi += " altrp-nav-menu-li-before altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-overline altrp-nav-menu-li-pointer";
        break;
      case "underLine":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-underLine altrp-nav-menu-li-pointer";
        break;
      case "doubleLine":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-before altrp-nav-menu-li-doubleLine altrp-nav-menu-li-pointer";
        break;
      case "framed":
        classesLi += " altrp-nav-menu-li-after altrp-nav-menu-li-before-after-styles altrp-nav-menu-li-framed altrp-nav-menu-li-before altrp-nav-menu-li-pointer";
        break;
      case "background":
        classesLi += " altrp-nav-menu-li-background altrp-nav-menu-li-pointer";
        break;
      case "text":
        classesLi += " altrp-nav-menu-li-animation-text altrp-nav-menu-li-pointer";
        break

    }

    return (
      <ul style={stylesUl} className={"altrp-nav-menu-ul altrp-nav-menu-ul-" + layout}>
        {
          this.state.list.map((li, idx) => {
            let url = li.link_repeater_menu_layout ? li.link_repeater_menu_layout.url : "";

            return (
              !li.parent_id_repeater_menu_layout ? (
                <li style={stylesLi} key={idx} className={classesLi}>
                  <div className="altrp-nav-menu-li-link-wrapper">
                    <Link to={url} style={stylesLink} className="altrp-nav-menu-li-link">
                      <div className="altrp-nav-menu-li-link-label">
                        {li.label_repeater_menu_layout}
                      </div>
                      {
                        li.id_repeater_menu_layout ? (
                          // altrp-nav-menu-li-link-icon-active
                          <div className="altrp-nav-menu-li-link-icon">
                            {
                              iconsManager().renderIcon('chevron')
                            }
                          </div>
                        ) : ""
                      }
                    </Link>
                  </div>
                  {
                    li.id_repeater_menu_layout ? <Dropdown children={li.children} list={this.state.list}/> : ""
                  }
                </li>
                ) : ""
            )
          })
        }
      </ul>
    );
  }
}

export default HorizontalVeticalMenu;
