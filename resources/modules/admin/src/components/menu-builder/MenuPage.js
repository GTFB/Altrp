import React, {Component} from "react";
import {Link} from "react-router-dom";
import MenuBuilder from "./MenuBuilder";
import {withRouter} from "react-router";

class MenuPage extends Component {
  render() {
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link to="/admin/menus" className="admin-breadcrumbs__link">All Menus</Link>
        </div>
      </div>
      <div className="admin-content">
        <MenuBuilder
          menuId={this.props.match.params?.id}
          afterDelete={()=>{this.props.history.push('/admin/menus/')}}/>
      </div>
    </div>
  }
}

export default withRouter(MenuPage)
