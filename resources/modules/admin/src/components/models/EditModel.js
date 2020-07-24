import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import EditModelForm from "./EditModelForm";
import AdminTable from "../AdminTable";

const columns = [
  {
    name: 'title',
    title: 'Title',
    url: true,
    editUrl: true,
    tag: 'Link'
  },
  {
    name: 'name',
    title: 'Name'
  },
  {
    name: 'description',
    title: 'Description'
  }
];

const mockedData = [
  {
    id: 1,
    name: 'test1',
    title: 'Test1',
    description: 'test1'
  },
  {
    id: 2,
    name: 'test2',
    title: 'Test2',
    description: 'test2'
  },
  {
    id: 3,
    name: 'test3',
    title: 'Test3',
    description: 'test3'
  }
]

class EditModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: mockedData[0],
      fields: mockedData,
      relations: mockedData
      // model: {},   TODO: заменить замоканые данные
      // fields: [],
      // relations: []
    };
  }

  componentDidMount() {
    //const { id: model_id } = this.props.match.params;

    // get: /admin/ajax/models/${modelId} .then(model => {
    //   this.setState({model});
    // });

    // get: /admin/ajax/models/{model_id}/fields .then(fields => {
    //   this.setState({fields});
    // });

    // get: /admin/ajax/models/{model_id}/relations .then(relations => {
    //   this.setState({relations});
    // });
  }

  render() {
    const { model, fields, relations } = this.state;

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/models">Tables / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Edit Model</span>
        </div>
      </div>
      <div className="admin-content">
        <EditModelForm model={model} />

        <h2 className="sub-header">Fields</h2>
        <AdminTable
          columns={columns}
          rows={fields.map(field => ({ ...field, editUrl: `/admin/${model.id}/fields/edit/${field.id}` }))}
        />
        <Link className="btn btn_add" to={`/admin/${model.id}/fields/add`}>Add Field</Link>

        <h2 className="sub-header">Relations</h2>
        <AdminTable
          columns={columns}
          rows={relations.map(relation => ({ ...relation, editUrl: '/admin/relations/edit/' + relation.id }))}
        />
        <Link className="btn btn_add" to={`/admin/relations/add`}>Add Relation</Link>
      </div>
    </div>;
  }
}

export default withRouter(EditModel);