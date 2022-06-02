import React, { Component } from "react";
import WidgetIcon from "./WidgetIcon";
import Scrollbars from "react-custom-scrollbars";
import {connect} from "react-redux";
import Search from '../../svgs/search-editor.svg'
import WidgetsGroupItem from "./WidgetsGroupItem";
const defaultGroups = [{
  name: 'activeGroupBasic',
  title: 'Basic',
},{
  name: 'activeGroupForm',
  title: 'Form'
},{
  name: 'activeGroupAdvanced',
  title: 'Advanced'
},{
  name: 'activeGroupDiagrams',
  title: 'Diagrams'
},
]
class WidgetsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGroup: 'activeGroupBasic',
      searchWidgets: '',
      groups:defaultGroups
    }
  }

  toggleGroups = (name) => {
    this.setState(state=>({...state, activeGroup: name}))
  }
  componentDidMount(){
    this.updateGroups()
  }
  updateGroups(){
    let additionalGroups = []
    const elements = this.props.elements
    for (let elem in elements){
      if(elements.hasOwnProperty(elem) && elements[elem].getGroup){
        if(defaultGroups.map(g=>g.title).indexOf(elements[elem].getGroup()) === -1){
          console.log(elements[elem].getGroup());
          additionalGroups.push(elements[elem].getGroup())
        }

      }
    }
    console.log(additionalGroups);

    additionalGroups = _.uniq(additionalGroups)
    additionalGroups = additionalGroups.map(ag=>({name: ag, title: ag}))
    let groups = [...this.state.groups, ...additionalGroups]
    this.setState(state=>({...state, groups}))
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
   if(prevProps.elements !== this.props.elements){
     this.updateGroups()
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
    const {groups, activeGroup} = this.state
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
              {groups.map(gr=>{
                return <WidgetsGroupItem
                  key={gr.name}
                  widgets={widgets}
                  activeGroup={activeGroup === gr.name}
                  toggleGroups={()=>this.toggleGroups(gr.name)}
                  name={gr.title}
                />
              })}
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
