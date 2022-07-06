import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import mutate from "dot-prop-immutable";
import UserTopPanel from "../UserTopPanel";
import {InputGroup} from "@blueprintjs/core";
import Search from "../../svgs/search.svg";
import NewPluginItem from "./NewPluginItem";
import './plugin-search.scss'

export default class SearchPlugins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plugins: [],
      downloadedPlugins: [],
      activeHeader: 4,
    };
    this.searchResource = new Resource({
      route:'https://altrp.market/ajax/models/market_plugins/customizers/search_plugins_for_user_ac58fmi3g'
    });
    this.downloadedPluginsResource = new Resource({
      route:'/admin/ajax/plugins'
    });
  }

  async componentDidMount() {

    let result = await  this.searchResource.getAll( {
      'Authorization': window.altrpMarketApiToken || ''
    })
    if(_.isArray(result.data)){
      this.setState(state=>({...state, updating: false, plugins: result.data}))
    } else {
      this.setState(state=>({...state, updating: false}))
    }

    result = await this.downloadedPluginsResource.getAll()
    if(_.isArray(result)){
      this.setState(state=>({...state, downloadedPlugins: result}))
    }

  }

  listenScrollHeader = () => {
    if (window.scrollY > 4 && this.state.activeHeader !== 1) {
      this.setState({
        activeHeader: 1
      })
    } else if (window.scrollY < 4 && this.state.activeHeader !== 0) {
      this.setState({
        activeHeader: 0,
        plugins: []
      })
    }
  }
  onChange = async (e)=>{
    let search = e.target.value
    this.setState(state=>({...state, updating: true}))
    let result = await  this.searchResource.getQueried({s:search}, {
      'Authorization': window.altrpMarketApiToken || ''
    })
    if(_.isArray(result.data)){
      this.setState(state=>({...state, updating: false, plugins: result.data}))
    } else {
      this.setState(state=>({...state, updating: false}))
    }
  }
  render() {
    const {updating, plugins, downloadedPlugins} = this.state;
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
            <form className="admin-table-top admin-table-top__search-plugin" onSubmit={(e)=>e.preventDefault()}>
              <InputGroup className="form-tables"
              onChange={this.onChange}/>
              <Search />
            </form>
            <div className="plugins-search-list row align-items-stretch">
              {
                updating ? '' :
                  plugins.map((plugin, idx)=>{
                    return <NewPluginItem key={plugin.id} plugin={plugin} downloadedPlugins={downloadedPlugins} />
                  })

              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
