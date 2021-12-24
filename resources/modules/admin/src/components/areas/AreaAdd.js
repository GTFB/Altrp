import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import AreaForm from "./AreaForm";
import {withRouter} from "react-router";
import UserTopPanel from "../UserTopPanel";

class AreaAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHeader: 0,
      categoryOptions: []
    }
    this.resource = new Resource({route: '/admin/ajax/areas'});
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
  }

  async componentDidMount() {
    let { data } = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      categoryOptions: data
    }))
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
      const res = this.resource.post(value);
      alert('Success');
      this.props.history.push('/admin/areas');
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
       <div className="admin-heading-left">
         <div className="admin-breadcrumbs">
           <Link to="/admin/areas" className="admin-breadcrumbs__link">Areas</Link>
         </div>
       </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <AreaForm categoryOptions={this.state.categoryOptions} onSubmit={this.submitForm}/>
      </div>
    </div>
  }
}

export default withRouter(AreaAdd)
