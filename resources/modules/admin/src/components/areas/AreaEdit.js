import {withRouter} from "react-router";
import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import AreaForm from "./AreaForm";


class AreaEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resource = new Resource({route: '/admin/ajax/areas'});
  }

  async componentDidMount() {
    try {
      let value = await this.resource.get(this.props.match.params.id)
      this.setState(state=>({...state, value}))
    } catch (e) {
      console.error(e);
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
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link to="/admin/areas" className="admin-breadcrumbs__link">Areas</Link>
        </div>
      </div>
      <div className="admin-content">
        {this.state.value &&
        <AreaForm onSubmit={this.submitForm}
                  submitText={'Update'}
                  value={this.state.value}/>}
      </div>
    </div>
  }
}

export default withRouter(AreaEdit)
