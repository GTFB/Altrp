import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import AdminTable from "../AdminTable";
import {Link} from "react-router-dom";

export const DEFAULT_AREAS = [
  'content',
  'footer',
  'header',
  'popup',
  'email',
  'card',
  'reports',
];

class Areas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
    }
  }

  async componentDidMount() {
    this.updateAreas();
  }

  updateAreas = async () => {
    const resource = new Resource({route: '/admin/ajax/areas'});
    let areas = await resource.getAll();
    areas = areas.filter(area => DEFAULT_AREAS.indexOf(area.name) === -1)
    this.setState(state => ({...state, areas}))
  }

  render() {
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <div className="admin-breadcrumbs__current">Areas</div>
        </div>
        <Link className="btn" to={`/admin/areas/add`}>Add New</Link>
      </div>
      <div className="admin-content">
        <AdminTable columns={[
          {
            name: 'title',
            title: 'Title',
            url: true,
            editUrl: true,
            tag: 'Link'
          },
        ]}
                    quickActions={[
                      {
                        tag: "button",
                        route: `/admin/ajax/areas/:id`,
                        method: "delete",
                        confirm: "Are You Sure?",
                        after: ()=>{this.updateAreas()},
                        className: "quick-action-menu__item_danger",
                        title: "Trash"
                      }
                    ]}
                    rows={this.state.areas.map(area => ({
                      ...area,
                      editUrl: '/admin/areas/' + area.id
                    }))}/>
      </div>
    </div>
  }
}

export default Areas
