import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import EditModelForm from "./EditModelForm";
import Resource from "../../../../editor/src/js/classes/Resource";
import UserTopPanel from "../UserTopPanel";

class AddModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
        name: '',
        title: '',
        description: '',
        _categories: [],
        categories: [],
        categoryOptions: [],
        bounded_model: '',
        soft_deletes: false,
        time_stamps: false
      }
    };
    this.modelsResource = new Resource({route: '/admin/ajax/models'});
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
  }

  async componentDidMount() {
    const { data } = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      model: {
        ...state.model,
        categoryOptions: data
      }
    }))
  }


  /**
   * Обработка формы
   * @return {*}
   */
  onSubmit = async (model) => {
    let res;
    const isNameTaken = !this.state.id || this.modelName !== model.name ?
      await fetch(`/admin/ajax/model_name_is_free/?name=${model.name}`)
        .then(res => res.json())
        .then(res => !res.taken) :
      null;

    if (isNameTaken) {
      return alert(`Name ${model.name} is already taken. Use another one.`)
    }

    await this.modelsResource.post(model);

    this.props.history.push("/admin/tables/models");
  };

  render() {
    const { model } = this.state;
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Tables / All Models</Link>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">Add Model</span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <EditModelForm model={model}
                       submitText='Add'
                       edit={model.id}
                       onSubmit={this.onSubmit}
                       updateModels={this.props.updateModels}
        />
      </div>
    </div>;
  }
}

export default withRouter(AddModel);
