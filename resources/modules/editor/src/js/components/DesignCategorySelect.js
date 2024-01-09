import Resource from "../classes/Resource";
import React from "react";
import {connect} from "react-redux";
import {setCategory} from "../store/current-design-category/actions";

class DesignCategorySelect extends Component {

  state = {
    options: []
  }
  componentDidMount = async () => {
    this.categories = new Resource({route: "/admin/ajax/category/options"});
    const options = (await this.categories.getQueried({
      orderBy: 'title'
    })).data

    this.setState(state => ({...state, options}))
  }
  onChange = (e)=>{
    const{
      options
    } = this.state
    const category = options.find(o=>o.value === e.target.value)
    editorStore.dispatch(setCategory(category || {}))
  }
  render() {
    const{
      currentCategory
    } = this.props
    const{
      options
    } = this.state
    return <div className="design-category-select">
      <div className="controller-container controller-container_select">
        <div className="controller-container__label control-select__label">Current Category:</div>
        <div className="control-container_select-wrapper">
          <select className="control-select control-field"
                  onChange={this.onChange}
                  value={currentCategory?.value || ''}>
            <option value="">Not Select...</option>
            {options.map(o=>{
              return <option value={o.value} key={o.value}>{o.label}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.currentCategory,
  };
}
export default connect(mapStateToProps)(DesignCategorySelect)
