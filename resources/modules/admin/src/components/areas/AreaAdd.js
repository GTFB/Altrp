import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import AreaForm from "./AreaForm";
import {withRouter} from "react-router";

class AreaAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.resource = new Resource({route: '/admin/ajax/areas'});
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
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link to="/admin/areas" className="admin-breadcrumbs__link">Areas</Link>
        </div>
      </div>
      <div className="admin-content">
        <AreaForm onSubmit={this.submitForm}/>
      </div>
    </div>
  }
}

export default withRouter(AreaAdd)
