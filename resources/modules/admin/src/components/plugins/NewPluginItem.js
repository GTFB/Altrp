import React, {Component} from "react";
import {Button, Icon} from "@blueprintjs/core";
import Resource from "../../../../editor/src/js/classes/Resource";
import compareVersions from "compare-versions";

class NewPluginItem extends Component {
  state = {};
  installPluginResource = new Resource({route: '/admin/ajax/plugins/install'})
  installPlugin = async () => {
    const {plugin,} = this.props
    let res = await this.installPluginResource.post({
       ...plugin
    })
    console.log(res);
  }

  render() {
    const {plugin,} = this.props
    console.log(plugin);
    return (
      <div className="col-4  new-plugin-item">
        <div className="border rounded">
          <div className="row">
            <div className="col-4">
              <img src={plugin.logo_url}
                   className="new-plugin-item__logo"
                   alt={plugin.name}/>
            </div>
            <div className="col-8">
              <div className="title">{plugin.title} <pre>{plugin.version}</pre></div>
              <div className="description">{plugin.description}</div>
              <Button text="Install" onClick={this.installPlugin}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default NewPluginItem
