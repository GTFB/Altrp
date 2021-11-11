import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import {Link} from "react-router-dom";
import AdminTable from "../AdminTable";
import CONSTANTS from "../../../../editor/src/js/consts";
import {mbParseJSON} from "../../../../front-app/src/js/helpers";
import {withRouter} from "react-router";
import {buildPagesTree} from "../../js/helpers";

class MenusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      currentPage: 1,
      menusSearch: ""
    }
    this.resource = new Resource({route: '/admin/ajax/menus'})
    this.itemsPerPage = 3;
  }

  async componentDidMount() {
    try {
      let menus = await this.resource.getAll();
      this.setState(state => ({...state, menus}));
    } catch (e) {
      console.error(e);
    }
  }

  searchMenus = (e) => {
    e.preventDefault();
    this.updateMenus();
  }

  changeMenus = (e) => {
    this.setState( { menusSearch: e.target.value})
  }

  addNew = async()=>{
    try{
      let res = await this.resource.post({name: '', children: '[]'});
      res = res.data;
      this.props.history.push(`/admin/menus/${res.id}`)
    } catch (e) {
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
    let menus = await  this.resource.getQueried({ s: this.state.menusSearch });
    this.setState(state => ({...state, menus}))
  }

  render() {

    const { menus, currentPage, menusSearch } = this.state;

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <div className="admin-breadcrumbs__current">Menus</div>
        </div>
        <button className="btn" onClick={this.addNew} >Add New</button>
      </div>
      <div className="admin-content">
        <AdminTable
          columns={[
            {
              name: 'name',
              title: 'Name',
              url: true,
              editUrl: true,
              tag: 'Link'
            },
            {
              name: 'categories',
              title: 'Categories'
            }
          ]}

          quickActions={[
            {
              tag: 'Link',
              props: { href: '/admin/menus/:id' },
              title: 'Edit'
            },
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
          rows={buildPagesTree(menus).slice(
            currentPage * this.itemsPerPage - this.itemsPerPage,
            currentPage * this.itemsPerPage
          )}

          searchMenus={{
            onSubmitMenus: this.searchMenus,
            valueMenus: menusSearch,
            onChangeMenus: this.changeMenus
          }}

          pageCount={Math.ceil(menus.length / this.itemsPerPage) || 1}
          currentPage={currentPage}
          changePage={page => {
            if (currentPage !== page) {
              this.setState({ currentPage: page });
            }
          }}
          itemsCount={menus.length}

          openPagination={true}
        />
      </div>
    </div>
  }
}

export default withRouter(MenusList)
