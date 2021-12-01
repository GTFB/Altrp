import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AddAccessorForm from "./AddAccessorForm";
import Resource from "../../../../editor/src/js/classes/Resource";
import UserTopPanel from "../UserTopPanel";

class AddAccessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelTitle: 'Model Title',
      activeHeader: 0,
    };
    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
  }

  async componentDidMount() {
    const { modelId } = this.props.match.params;
    let model = await this.modelsResource.get(modelId);
    this.setState({ modelTitle: model.title })

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
    const { modelTitle } = this.state;
    const { modelId } = this.props.match.params;

    return <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Models / All Models</Link>
            <span className="admin-breadcrumbs__separator">/</span>
            <Link className="admin-breadcrumbs__link" to={`/admin/tables/models/edit/${modelId}`}>
              {modelTitle}
            </Link>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">Add New Accessor</span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <AddAccessorForm />
      </div>
    </div>;
  }
}

export default withRouter(AddAccessor);
