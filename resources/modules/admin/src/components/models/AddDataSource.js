import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AddDataSourceForm from "./AddDataSourceForm";
import UserTopPanel from "../UserTopPanel";

class AddDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHeader: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollHeader)

    return () => {
      window.removeEventListener("scroll", this.listenScrollHeader)
    }
  }

  listenScrollHeader = () => {
    if (window.scrollY > 4 && this.state.activeHeader !== 1) {
      this.setState({
        activeHeader: 1
      })
    } else if (window.scrollY < 4 && this.state.activeHeader !== 0) {
      this.setState({
        activeHeader: 0
      })
    }
  }


  render() {
    const { id } = this.props.match.params;
    return <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Models / All Models</Link>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">{id ? 'Edit Data Source' : 'Add New Data Source'}</span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <AddDataSourceForm paramsId={id} />
      </div>
    </div>;
  }
}

export default withRouter(AddDataSource);
