import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AddFieldForm from "./AddFieldForm";

class EditField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelTitle: 'Model Title'
    };
  }
  componentDidMount() {
    //const { modelId } = this.props.match.params;

    // get: /admin/ajax/models/${modelId} .then(({ title }) => {
    //   this.setState({modelTitle: title});
    // });
  }

  render() {
    const { modelTitle } = this.state;
    const { modelId } = this.props.match.params;
    console.log(this.props.match.params);
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Models / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <Link className="admin-breadcrumbs__link" to={`/admin/tables/models/edit/${modelId}`}>
            {modelTitle}
          </Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Add New Field</span>
        </div>
      </div>
      <div className="admin-content">
        <AddFieldForm />
      </div>
    </div>;
  }
}

export default withRouter(EditField);