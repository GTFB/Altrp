import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import mutate from "dot-prop-immutable";

export default class SearchPlugins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plugins: [],
      activeHeader: 4,
    };
  }

  async componentWillMount() {
  }

  updatePlugins = async ()=>{
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
    return (
      <div className="admin-pages admin-page">
        <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
          <div className="admin-heading-left">
            <div className="admin-breadcrumbs">


              <span className="admin-breadcrumbs__current">Plugins Search</span>
            </div>
          </div>
          <UserTopPanel />
        </div>
        <div className="admin-content">
          <div className="row">

          </div>
        </div>
      </div>
    );
  }
}
