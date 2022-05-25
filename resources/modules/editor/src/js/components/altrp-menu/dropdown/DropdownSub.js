import React, {Component} from 'react';
import AltrpImage from "../../altrp-image/AltrpImage";
import LinkMenu from "../LinkMenu";

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
        <div className="altrp-nav-menu-li-link-dropdown altrp-nav-menu-dropdown-sub-label" onClick={this.changeShow}>
          <span>
            {
              this.props.li.label_repeater_menu_layout
            }
          </span>
          <AltrpImage
            image={this.props.settings.chevron_dropdown_menu_section}
            element={this.props.element}
            default={{
              assetType: "icon",
              name: 'chevron',
              iconComponent: iconsManager.renderIcon('chevron')
            }}
            className={"altrp-nav-menu-li-link-chevron-dropdown" + (this.state.show ? " altrp-nav-menu-li-link-active-chevron-dropdown" : "")}
          />
        </div>
        <div className={"altrp-nav-menu-dropdown-sub-content altrp-nav-menu-ul-wrapper-dropdown altrp-nav-menu-dropdown-content" + (!this.state.show ? " altrp-nav-menu-dropdown-content-hide" : " altrp-nav-menu-dropdown-content-show")}>
          <ul className="altrp-nav-menu-ul-dropdown">
            {
              this.state.list.map((li, idx) => {
                let link = <LinkMenu
                  defaultChildren={(<div className="altrp-nav-menu-li-link-dropdown altrp-nav-menu-li-link-label-dropdown"/>)}
                  modelData={this.props.modelData}
                  modelId={this.props.modelId || null}
                  link={li.link_repeater_menu_layout}
                  className="altrp-nav-menu-li-link-dropdown altrp-nav-menu-li-link-label-dropdown"
                >
                  {
                    li.label_repeater_menu_layout
                  }
                </LinkMenu>;

                return <li className="altrp-nav-menu-li-dropdown" key={idx}>
                  {!li.id_repeater_menu_layout ? (
                    <React.Fragment>
                      {
                        link
                      }
                      {
                        this.props.settings.divider_switch_dropdown_menu_section ? <div className="altrp-nav-menu-dropdown-s-content-divider"/> : ""
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
