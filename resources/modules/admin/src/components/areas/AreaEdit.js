import {withRouter} from "react-router";
import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import AreaForm from "./AreaForm";


class AreaEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHeader: 0,
      categoryOptions: [],
    };
    this.resource = new Resource({route: '/admin/ajax/areas'});
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
  }

  async componentDidMount() {
    try {
      let { data } = await this.categoryOptions.getAll();
      let value = await this.resource.get(this.props.match.params.id)
      this.setState(state => ({
        ...state,
        categoryOptions: data,
        value: {
          ...value,
          _categories: value.categories,
        }
      }))
    } catch (e) {
      console.error(e);
    }
    window.addEventListener("scroll", this.listenScrollHeader)

    return () => {
      window.removeEventListener("scroll", this.listenScrollHeader)
    }
  }

  listenScrollHeader = () => {
    if (window.scrollY > 4 && this.state.activeHeader !== 1) {
      this.setState({
        activeHeader: 1
      })
    } else if (window.scrollY < 4 && this.state.activeHeader !== 0) {
      this.setState({
        activeHeader: 0
      })
    }
  }

  submitForm = value => {
    try{
      const res = this.resource.put(this.props.match.params.id, value);
      alert('Success');
      this.props.history.push('/admin/areas');
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-breadcrumbs">
          <Link to="/admin/areas" className="admin-breadcrumbs__link">Areas</Link>
        </div>
      </div>
      <div className="admin-content">
        {this.state.value &&
        <AreaForm onSubmit={this.submitForm}
                  categoryOptions={this.state.categoryOptions}
                  submitText={'Update'}
                  value={this.state.value}/>}
      </div>
    </div>
  }
}

export default withRouter(AreaEdit)
