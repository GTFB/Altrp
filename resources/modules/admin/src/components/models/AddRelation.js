import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AddRelationForm from "./AddRelationForm";
import Resource from "../../../../editor/src/js/classes/Resource";

class AddRelation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelTitle: 'Model Title'
    };
    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
  }
  
  async componentDidMount() {
    const { modelId } = this.props.match.params;
    let model = await this.modelsResource.get(modelId);
    this.setState({ modelTitle: model.title })
  }

  render() {
    const { modelTitle } = this.state;
    const { modelId } = this.props.match.params;

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Models / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <Link className="admin-breadcrumbs__link" to={`/admin/tables/models/edit/${modelId}`}>
            {modelTitle}
          </Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Add New Relation</span>
        </div>
      </div>
      <div className="admin-content">
        <AddRelationForm />
      </div>
    </div>;
  }
}

export default withRouter(AddRelation);