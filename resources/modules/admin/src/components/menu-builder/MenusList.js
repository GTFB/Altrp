import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import AdminTable from "../AdminTable";
import CONSTANTS from "../../../../editor/src/js/consts";
import {mbParseJSON} from "../../../../front-app/src/js/helpers";
import {withRouter} from "react-router";

class MenusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
    }
    this.resource = new Resource({route: '/admin/ajax/menus'})
  }

  async componentDidMount() {
    try {
      let menus = await this.resource.getAll();
      this.setState(state => ({...state, menus}));
    } catch (e) {
      console.error(e);
    }
  }

  addNew = async()=>{
    try{
      let res = await this.resource.post({name: '', children: '[]'});
      res = res.data;
      console.log(res);
      this.props.history.push(`/admin/menus/${res.id}`)
    }catch (e) {
      if(e.res instanceof Promise){
        e = await e.res.then();
        e = mbParseJSON(e);
      } else if (e instanceof Promise){
        e = await e.then();
        e = mbParseJSON(e);
      }
      console.error(e);
      alert('Error: ' + e.message);
    }
  }

  updateMenus = async () => {
    this.resource = new Resource({route: '/admin/ajax/menus'});
    let menus = await  this.resource.getAll();
    this.setState(state => ({...state, menus}))
  }

  render() {
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <div className="admin-breadcrumbs__current">Areas</div>
        </div>
        <button className="btn" onClick={this.addNew} >Add New</button>
      </div>
      <div className="admin-content">
        <AdminTable
          columns={[
            {
              name: 'name',
              title: 'Name',
              default: '(no Name)',
              url: true,
              editUrl: true,
              tag: 'Link'
            },
          ]}

          quickActions={[
            {
              tag: "button",
              route: `/admin/ajax/menus/:id`,
              method: "delete",
              confirm: "Are You Sure?",
              after: () => {
                this.updateMenus()
              },
              className: "quick-action-menu__item_danger",
              title: "Trash"
            }
          ]}
          rows={this.state.menus.map(menu => ({
            ...menu,
            editUrl: '/admin/menus/' + menu.id
          }))}/>
      </div>
    </div>
  }
}

export default withRouter(MenusList)
