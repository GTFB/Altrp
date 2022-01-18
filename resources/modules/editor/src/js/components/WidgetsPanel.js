import React, { Component } from "react";
import WidgetIcon from "./WidgetIcon";
import Scrollbars from "react-custom-scrollbars";
import {connect} from "react-redux";
import Search from '../../svgs/search-editor.svg'
import WidgetsGroupItem from "./WidgetsGroupItem";

class WidgetsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGroupBasic: true,
      activeGroupForm: true,
      activeGroupAdvanced: true,
      activeGroupDiagrams: true,
      searchWidgets: ''
    }
  }

  toggleGroups = (e) => {
    switch (e.currentTarget.dataset.group) {
      case 'Basic':
        this.setState(state => ({
          ...state,
          activeGroupBasic: !this.state.activeGroupBasic
        }))
        break
      case 'Form':
        this.setState(state => ({
          ...state,
          activeGroupForm: !this.state.activeGroupForm
        }))
        break
      case 'Advanced':
        this.setState(state => ({
          ...state,
          activeGroupAdvanced: !this.state.activeGroupAdvanced
        }))
        break
      case 'Diagrams':
        this.setState(state => ({
          ...state,
          activeGroupDiagrams: !this.state.activeGroupDiagrams
        }))
        break
    }
  }

  changeSearch = (e) => {
    this.setState(state => ({
      ...state,
      searchWidgets: e.target.value
    }))
  }

  render() {
    const {elements} = this.props
    let widgets = []

    for (let elementName in elements) {
      if (
        elements.hasOwnProperty(elementName) &&
        elements[elementName].getType() === "widget"
      ) {
        widgets.push(elements[elementName]);
      }
    }

    let widgetsFilter = widgets.filter(item => item.getTitle().toLowerCase().includes(this.state.searchWidgets.toLowerCase()))

    return (
      <div className="widget-panel-wrapper">
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <div className="widget-panel__sidebar">
            <div className="widget-panel__search">
              <input onChange={this.changeSearch} value={this.state.searchWidgets} type="text" placeholder="Search Widget..." className="input-search__widgets"/>
              <Search className='search-icon'/>
            </div>
            {this.state.searchWidgets === '' ? (
               <>
                 <WidgetsGroupItem
                   widgets={widgets}
                   activeGroup={this.state.activeGroupBasic}
                   toggleGroups={this.toggleGroups}
                   name={'Basic'}
                 />

                 <WidgetsGroupItem
                   widgets={widgets}
                   activeGroup={this.state.activeGroupForm}
                   toggleGroups={this.toggleGroups}
                   name={'Form'}
                 />

                 <WidgetsGroupItem
                   widgets={widgets}
                   activeGroup={this.state.activeGroupAdvanced}
                   toggleGroups={this.toggleGroups}
                   name={'Advanced'}
                 />

                 <WidgetsGroupItem
                   widgets={widgets}
                   activeGroup={this.state.activeGroupDiagrams}
                   toggleGroups={this.toggleGroups}
                   name={'Diagrams'}
                 />

               </>
            ) : (
              <>
                  {
                    widgetsFilter.length === 0 ? (
                      <div className="nothing__found">Nothing found</div>
                    ) : (
                      <div className="widgets">
                        {
                          widgetsFilter.map(widget => {
                            return <WidgetIcon element={widget} key={widget.getName()} />;
                          })
                        }
                      </div>
                    )
                  }
              </>
            )}
          </div>
        </Scrollbars>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    elements: state.widgetsManager.elements,
  }
}

export default connect(mapStateToProps)(WidgetsPanel);
