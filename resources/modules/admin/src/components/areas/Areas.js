import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import AdminTable from "../AdminTable";
import {Link} from "react-router-dom";
import CONSTANTS from '../../../../editor/src/js/consts'
import {buildPagesTree} from "../../js/helpers";

class Areas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      currentPage: 1,
      areasSearch: ""
    }

    this.resource = new Resource({route: '/admin/ajax/areas'});
    this.itemsPerPage = 10;
  }

  async componentDidMount() {
    this.updateAreas();
  }

  updateAreas = async () => {
    let areas = await this.resource.getQueried({ s: this.state.areasSearch });
    areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
    this.setState(state => ({...state, areas: areas}))
  }

  searchAreas = (e) => {
    e.preventDefault();
    this.updateAreas();
  }

  changeAreas = (e) => {
    this.setState( { areasSearch: e.target.value})
  }

  render() {

    const { areas, currentPage, areasSearch } = this.state;

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <div className="admin-breadcrumbs__current">Custom Areas</div>
        </div>
        <Link className="btn" to={`/admin/areas/add`}>Add New</Link>
      </div>
      <div className="admin-content">
        <AdminTable
          columns={[
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
              after: () => {
                this.updateAreas()
              },
              className: "quick-action-menu__item_danger",
              title: "Trash"
            }
          ]}
          rows={buildPagesTree(areas).slice(
            currentPage * this.itemsPerPage - this.itemsPerPage,
            currentPage * this.itemsPerPage
          )}

          searchAreas={{
            onSubmitAreas: this.searchAreas,
            valueAreas: areasSearch,
            onChangeAreas: this.changeAreas
          }}

          pageCount={Math.ceil(areas.length / this.itemsPerPage) || 1}
          currentPage={currentPage}
          changePage={page => {
            if (currentPage !== page) {
              this.setState({ currentPage: page });
            }
          }}
          itemsCount={areas.length}

          openPagination={true}
        />
      </div>
    </div>
  }
}

export default Areas
