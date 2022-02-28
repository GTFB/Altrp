import React, { Component } from "react";
import SQLBuilderForm from "./sql-builder/SQLBuilderForm";
import {withRouter} from "react-router-dom";
import UserTopPanel from "./UserTopPanel";

class SQLBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeHeader: 0,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollHeader)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollHeader)
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
    return <div className="admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">SQL</a>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <SQLBuilderForm />
      </div>
    </div>
  }
}

export default withRouter(SQLBuilder);
