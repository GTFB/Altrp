import React, { Component } from "react";
import axios from "axios";
import UserTopPanel from "./UserTopPanel";
import Resource from "../../../editor/src/js/classes/Resource";
import mutate from "dot-prop-immutable";
import {Button, Icon} from "@blueprintjs/core";
import PluginItem from "./plugins/PluginItem";

export default class Plugins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plugins: [],
      activeHeader: 0,
    };
  }

  async componentDidMount() {
    const req = await axios.get("/admin/ajax/plugins");
    let plugins = req.data
    if(! _.isArray(plugins)){
      plugins = []
    }
    this.setState({
      plugins
    });
    window.addEventListener("scroll", this.listenScrollHeader)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollHeader)
  }

  updatePlugins = async ()=>{
    let plugins = await ( new Resource({route:'/admin/ajax/plugins'})).getAll()
    if(! _.isArray(plugins)){
      plugins = []
    }
    this.setState({
      plugins
    });
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

   updateChange = async(event, index) => {
    this.state.plugins[index].enabled = event.target.checked;

    const pluginName = this.state.plugins[index].name;
    const value = event.target.checked;

    const res = await (new Resource({route:'/admin/ajax/plugins/switch'})).post({
      name: pluginName,
      value: value
    });

    if(res.success){
      const plugins = mutate.set(this.state.plugins, `${index}.enabled`, value);

      this.setState({
        plugins
      });
    }
  }
  render() {
    return (
      <div className="admin-pages admin-page">
        <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
          <div className="admin-heading-left">
            <div className="admin-breadcrumbs">
              <a className="admin-breadcrumbs__link" href="#">
                Plugins
              </a>
              <span className="admin-breadcrumbs__separator">/</span>
              <span className="admin-breadcrumbs__current">Installed Plugins</span>
            </div>
          </div>
          <UserTopPanel />
        </div>
        <div className="admin-content">
          <div className="row">
            {this.state?.plugins?.map((item, key) => {
              return (
                <PluginItem _key={key}
                            updatePlugins={this.updatePlugins}
                            key={item.name} updateChange={this.updateChange} plugin={item}/>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
