import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import { Link, Redirect, withRouter } from 'react-router-dom';
import AltrpSelect from "./altrp-select/AltrpSelect";
import AdminTable from "./AdminTable";
import AdminModal2 from "./AdminModal2";
import PageDataSourceForm from "./pages/PageDataSourceForm";

const columns = [
  {
    name: 'id',
    title: 'ID',
    url: true,
    // editUrl: true,
    // tag: 'Link'
  },
  {
    name: 'alias',
    title: 'Alias'
  },
  {
    name: 'priority',
    title: 'Priority'
  },
  {
    name: 'parameters',
    title: 'Parameters'
  }
];

const dataSources = [
  {
    id: 1,
    page_id: 1,
    data_source_id: 1,
    alias: "alias",
    priority: 1,
    parameters: "parameters"
  },
  {
    id: 2,
    page_id: 1,
    data_source_id: 2,
    alias: "alias_2",
    priority: 2,
    parameters: "parameters_2"
  },
]

/**
 * @class
 * @property {Resource} resource
 */

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {},
      value: {},
      redirectAfterSave: false,
      templates: [],
      models: [],
      isModalOpened: false,
      dataSources: []
    };
    this.resource = new Resource({ route: '/admin/ajax/pages' });
    this.model_resource = new Resource({ route: '/admin/ajax/models_options' });
    this.templateResource = new Resource({ route: '/admin/ajax/templates' });
    this.dataSourceResource = new Resource({ route: '/admin/ajax/page_data_sources/pages' });
    this.savePage = this.savePage.bind(this);
  }

  /**
   * Компонент загрузился
   * получыаем данный страницы + опции для шаблона
   * @return {Promise<void>}
   */
  async componentDidMount() {
    let res = await this.templateResource.getOptions();
    this.setState(state => {
      return { ...state, templates: res }
    });

    let models_res = await this.model_resource.getAll();
    this.setState(state => {
      return { ...state, models: models_res }
    });
    let id = this.props.match.params.id;
    id = parseInt(id);
    if (id) {
      this.getDataSources();
      let pageData = await this.resource.get(id);
      this.setState(state => {
        return { ...state, value: pageData, id }
      });
    }
  }

  getDataSources = async () => {
    let id = this.props.match.params.id;
    const dataSources = await this.dataSourceResource.get(id);
    this.setState({ dataSources });
    this.setState({ isModalOpened: false })
  }

  /**
   * Сохранить страницу или добавить новую
   * @param e
   * @return {Promise<void>}
   */
  async savePage(e) {
    e.preventDefault();
    let res;
    let path = this.state.value.path;
    path = path.split('\\').join('/');
    path = (path[0] !== '/') ? `/${path}` : path;

    let redirect = this.state.value.redirect;
    redirect = (redirect || '').split('\\').join('/');
    if (redirect) {
      redirect = (redirect[0] !== '/') ? `/${redirect}` : redirect;
    }
    this.state.value.redirect = redirect;
    this.state.value.path = path;
    if (this.state.id) {
      res = await this.resource.put(this.state.id, this.state.value);
    } else {
      res = await this.resource.post(this.state.value);
    }
    if (res.success) {
      this.setState(state => {
        return { ...state, redirectAfterSave: true }
      });
    } else {
      this.setState(state => {
        return { ...state, value: {} }
      });
    }
  }
  changeValue(value, field) {
    if (field === 'path') {
      value = value.split('\\').join('/');
      value = (value[0] !== '/') ? `/${value}` : value;
    }
    if (field === 'redirect') {
      value = value.split('\\').join('/');
      if (value) {
        value = (value[0] !== '/') ? `/${value}` : value;
      }
    }
    this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      return state
    })
  }
  render() {
    const { dataSources, isModalOpened } = this.state;
    if (this.state.redirectAfterSave) {
      return <Redirect to="/admin/pages" />
    }
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/pages">Pages</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">{this.state.value.title || 'Add New Page'}</span>
        </div>
      </div>
      <div className="admin-content">
        <form className="admin-form" onSubmit={this.savePage} className="mb-2">
          <div className="form-group">
            <label htmlFor="page-title">Title</label>
            <input type="text" id="page-title" required={1}
              value={this.state.value.title || ''}
              onChange={e => { this.changeValue(e.target.value, 'title') }}
              className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="page-path">Path</label>
            <input type="text" id="page-path" required={1}
              value={this.state.value.path || ''}
              onChange={e => { this.changeValue(e.target.value, 'path') }}
              className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="page-template">Content Template</label>
            <select id="page-template"
              value={this.state.value.template_id || ''}
              onChange={e => { this.changeValue(e.target.value, 'template_id') }}
              className="form-control">
              <option value="" />
              {
                this.state.templates.map(template => {
                  return <option value={template.value} key={template.value}>{template.label}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="page-model">Model</label>
            <select id="page-model"
              value={this.state.value.model_id || ''}
              onChange={e => { this.changeValue(e.target.value, 'model_id') }}
              className="form-control">
              <option value="" />
              {
                this.state.models.map(model => {
                  return <option value={model.value} key={model.value}>{model.label}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="page-roles">Roles</label>
            <AltrpSelect id="page-roles"
              isMulti={true}
              optionsRoute="/admin/ajax/role_options"
              placeholder="All"
              defaultOptions={[
                {
                  value: 'guest',
                  label: 'Guest',
                }
              ]}
              value={this.state.value.roles}
              onChange={value => { this.changeValue(value, 'roles') }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="redirect">Redirect</label>
            <input type="text" id="redirect"
              value={this.state.value.redirect || ''}
              onChange={e => { this.changeValue(e.target.value, 'redirect') }}
              className="form-control" />
          </div>
          <button className="btn btn_success">{this.state.id ? 'Save' : 'Add'}</button>
        </form>

        {Boolean(dataSources.length) && <AdminTable
          columns={columns}
          quickActions={[
            // {
            //   tag: 'Link', props: {
            //     href: `/admin/tables/models/${id}/fields/edit/:id`,
            //   },
            //   title: 'Edit'
            // },
            {
              tag: 'button',
              route: `/admin/ajax/page_data_sources/:id`,
              method: 'delete',
              confirm: 'Are You Sure?',
              after: () => this.getDataSources(),
              className: 'quick-action-menu__item_danger',
              title: 'Trash'
            }
          ]}
          rows={dataSources.map(dataSource => ({ ...dataSource, /* editUrl: `/admin/tables/models/${model.id}/fields/edit/${field.id}` */ }))}
        />}

        {this.props.match.params.id &&
          <button onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
            Add Data Source
          </button>}

        {isModalOpened && <AdminModal2 closeHandler={() => this.setState({ isModalOpened: false })}>
          <PageDataSourceForm updateHandler={this.getDataSources} />
        </AdminModal2>}
      </div>
    </div>;
  }
}

export default withRouter(AddPage);
