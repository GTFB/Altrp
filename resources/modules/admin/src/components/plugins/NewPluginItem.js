import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import compareVersions from "compare-versions";
import './new-plugin-item.scss'

class NewPluginItem extends Component {
  state = {};
  installPluginResource = new Resource({route: '/admin/ajax/plugins/install'})
  installPlugin = async (action = null) => {
    const {plugin,} = this.props
    let res
    try{
      res = await this.installPluginResource.post({
        ...plugin,
      })
    }catch (e) {
      alert("Plugin failed to install: \n" + e.message)
      console.error(e);
      return
    }
    if(res?.success) {
      alert("Plugin successfully installed")
    } else {
      alert("Plugin failed to install")
    }
  }

  isPluginAdded = (items, name) => {
    return items.some((obj) => obj.name === name)
  }

  checkVersion = (plugin) => {
    const {downloadedPlugins} = this.props
    const currentDownloadedPlugin = downloadedPlugins.filter(downloadedPlugin => downloadedPlugin.name === plugin.name)
    return compareVersions(`${currentDownloadedPlugin[0].version}`, `${plugin.version}`) === -1
  }

  render() {
    const {plugin, downloadedPlugins} = this.props
    return (
      // <div className="search-plugins__item">
      //   <div className="border rounded">
      //     <div className="row">
      //       <div className="col-4">
      //         <img src={plugin.logo_url}
      //              className="new-plugin-item__logo"
      //              alt={plugin.name}/>
      //       </div>
      //       <div className="col-8">
      //         <div className="title">{plugin.title} <pre>{plugin.version}</pre></div>
      //         <div className="description">{plugin.description}</div>
      //         {
      //           // проверка плагина на скачанность
      //           this.isPluginAdded(downloadedPlugins, plugin.name)
      //             // проверка плагина на версионность, если плагину нужен апдейт - рендерим кнопку апдейта
      //           ? this.checkVersion(plugin)
      //             ? <button className="update__btn" onClick={() => this.installPlugin('update')}>Update</button>
      //             : <button className="reinstall__btn" onClick={this.installPlugin}>Reinstall</button>
      //
      //             : <button className="install__btn" onClick={this.installPlugin}>Install</button>
      //         }
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="search-plugins__item">
        <div className="search-plugins__item-img">
          <img src={plugin.logo_url} alt="img-plugin"/>
        </div>
        <div className="search-plugins__item-nv">
          <h2 className="search-plugins__item-title">{plugin.title}</h2>
          <div className="search-plugins__item-version">{plugin.version}</div>
        </div>
        <p className="search-plugins__item-description" dangerouslySetInnerHTML={{
          __html:plugin.description
        }}>
        </p>
        <div className="search-plugins__item-btn">
          {
            // проверка плагина на скачанность
            this.isPluginAdded(downloadedPlugins, plugin.name)
              // проверка плагина на версионность, если плагину нужен апдейт - рендерим кнопку апдейта
              ? this.checkVersion(plugin)
                ? <button className="plugin__btn plugin__btn-update" onClick={() => this.installPlugin('update')}>Update</button>
                :  <button className="plugin__btn plugin__btn-reinstall" onClick={this.installPlugin}>Reinstall</button>
              : <button className="plugin__btn plugin__btn-install" onClick={this.installPlugin}>Install</button>
          }
        </div>
      </div>
    )
  }

}

export default NewPluginItem
