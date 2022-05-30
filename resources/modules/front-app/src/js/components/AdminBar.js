import delay from '../functions/delay';
import AdminBarWrapper from './AdminBarWrapper';
import Resource from "../../../../editor/src/js/classes/Resource";
import Scrollbars from "react-custom-scrollbars";
import getDataByPath from "../functions/getDataByPath";

class AdminBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopupTemplate: false,
      visiblePopupHistory: false,
      valueInput: "",
      contentResult: <div/>,
      visibleContentResult: false,
      visibleAutocomplete: false,
      filteredOptions: [],
      isHttps: false,
      barIsOpened: false,
      arrayRevisions: null,
      update: false,
    };
    this.popupTemplateRef = React.createRef();
    this.popupHistoryRef = React.createRef();
    this.searchContentResult = React.createRef();
    this.autocomplete = React.createRef();
    this.searchInput = React.createRef();
    this.toggleVisiblePopupTemplate = this.toggleVisiblePopupTemplate.bind(
      this
    );
    this.handleInput = this.handleInput.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.openPageSettings = this.openPageSettings.bind(this);
    this.handleClickCopy = this.handleClickCopy.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleDoubleClickSearch = this.handleDoubleClickSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("click", this.handleOutsideClick);

    let protocol = location.href.split("://")[0];
    if(protocol === "https")
      this.setState(state => ({
        ...state,
        isHttps: true
      }));
  }

  toggleVisiblePopupTemplate(e) {
    e.stopPropagation();
    this.setState(state => ({
      ...state,
      visiblePopupTemplate: !state.visiblePopupTemplate
    }));
  }

  openTemplate(id) {
    return () => window.open(`/admin/editor?template_id=${id}`, "_blank");
  }

  openPageSettings() {
    window.open(`/admin/pages/edit/${this.props.idPage}`);
  }

  openPageAdmin() {
    window.open("/admin/dashboard");
  }

  handleInput(event) {
    let value = event.target.value;

    let options = localStorage.getItem("admin-bar-search-autocomplete")
      ? JSON.parse(localStorage.getItem("admin-bar-search-autocomplete"))
      : [];
    let filteredOptions = options.filter(
      item => item.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    filteredOptions.splice(6, filteredOptions.length - 6);

    this.setState(state => ({
      ...state,
      filteredOptions,
      valueInput: value
    }));
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.handleClickSearch();
    }
    if (event.key === "Escape") {
      this.setState(state => ({
        ...state,
        visibleContentResult: false
    }));
  }
  }

  renderResultSearch(resultSearch = null) {
    return JSON.stringify(getDataByPath(this.state.valueInput), null, 2);
  }


  handleOutsideClick(event) {
    const path = event.path || (event.composedPath && event.composedPath());

    if (!path.includes(this.popupHistoryRef.current)) {
      this.setState(state => ({
        ...state,
        visiblePopupHistory: false
      }))
    }
    if (!path.includes(this.popupTemplateRef.current)) {
      this.setState(state => ({
        ...state,
        visiblePopupTemplate: false
      }));
    }
    if (!path.includes(this.searchContentResult.current)) {
      this.setState(state => ({
        ...state,
        visibleContentResult: false
      }));
    }
    if (!path.includes(this.autocomplete.current) && !path.includes(this.searchInput.current)) {
      this.setState(state => ({
        ...state,
        visibleAutocomplete: false
      }));
    }
  }

  handleClickCopy() {
    JSON.stringify(getDataByPath(this.state.valueInput), null, "\t").select();
    document.execCommand("copy");
  }
  /**
   * Запрос на очистку кэша
   */
  // clearCache = async () => {
  //   if(! this.props.idPage){
  //     return;
  //   }
  //   let result  = await confirm('Are You Sure');
  //   if(! result){
  //     return;
  //   }
  //   try{
  //     let res = await new window.altrpHelpers.Resource({route:'/admin/ajax/clear_cache'}).delete(this.props.idPage);
  //   } catch(error){
  //     await confirm('Error');
  //
  //   }
  //   await confirm('Done');
  // };

  updateAllBackendResources = async () => {
    let result = confirm('Are You Sure');
    if(! result){
      return;
    }

    this.setState(state => ({
      ...state,
      update: true
    }))

    try{
      let res = await new Resource({route:'/admin/ajax/update-all-resources'}).post({});
      if(res.success){
        await alert('success');
      }
    }catch (e) {
      await delay(4000)
    }

    this.setState(state => ({
      ...state,
      update: false
    }))

    window.location.reload()
  }

  handleClickSearch() {
    let options = localStorage.getItem("admin-bar-search-autocomplete")
      ? JSON.parse(localStorage.getItem("admin-bar-search-autocomplete"))
      : [];
    options.push(this.state.valueInput);
    localStorage.setItem(
      "admin-bar-search-autocomplete",
      JSON.stringify(options)
    );
    this.setState(state => ({
      // ...state, contentResult: this.renderResultSearch(getDataByPath(this.state.valueInput)), visibleContentResult: true
      ...state,
      contentResult: this.renderResultSearch(),
      visibleContentResult: true
    }));
  }

  handleClickOptions(valueInput) {
    return () => {
      this.setState(state => ({
        ...state,
        visibleAutocomplete: false,
        valueInput
      }));
      this.handleClickSearch();
    };
  }

  onFocus() {
    this.setState(state => ({
      ...state,
      visibleAutocomplete: true
    }));
  }

  handleDoubleClickSearch() {
    this.setState(state => ({
      ...state,
      visibleContentResult: false
    }));
  }

  logout = async () => {
    const res = await new Resource({route:'/logout'}).post();
    location.reload();
  }

  toggleBar = () => {
    this.setState({
      barIsOpened: !this.state.barIsOpened
    })
    this.frontAppPadding(!this.state.barIsOpened)
  }

  frontAppPadding = (barIsOpened) => {
    let frontAppPadding = barIsOpened ? "true" : "false"

    const root = document.querySelector(':root');

    const components = [
      'front-app',
      'front-app-adaptive1070',
      'front-app-adaptive667'
    ]

    components.forEach(component => {
      root.style.setProperty(
        `--${component}-padding`, `var(--${component}-${frontAppPadding})`
      )
    })
  }

  htmlDecode(content) {
    let e = document.createElement('div');
    e.innerHTML = content;
    console.log(content)
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  toggleVisiblePopupHistory = () => {
    this.setState({
      visiblePopupHistory: !this.state.visiblePopupHistory
    })
  }

  getUserHistory = async () => {
    const arrayRevisions = await new Resource({
      route: `/admin/ajax/templates/${this.props.idPage}/reviews`
    }).getAll();

    arrayRevisions.reverse()

    this.setState(state => ({
      ...state,
      arrayRevisions
    }))
  }

  render() {
    let isInIframe;

    try {
        isInIframe = window.self !== window.top;
    } catch (e) {
        isInIframe = true;
    }

    if (isInIframe) {
      return '';
    }

    console.log(this.state.contentResult)
    return (
      <AdminBarWrapper>
        <div className={"admin-bar bvi-hide " + (this.state.barIsOpened ? '' : 'closed')}>
          <div className="admin-bar__tools">
            <div className="admin-bar__link" onClick={this.openPageAdmin}>
              Admin
            </div>
            <div className="admin-bar__tool">
              <span onClick={this.toggleVisiblePopupTemplate}>
                {iconsManager.renderIcon("admin-new-bar", {
                  className: "admin-bar__tool-svg"
                })}{" "}
                Edit-Template
              </span>

              {this.state.visiblePopupTemplate && (
                <div
                  className="admin-bar__popup-template"
                  ref={this.popupTemplateRef}
                >
                  {this.props.areas.map((item, index) => {
                    if(item.id === "popups" && item.templates.length > 0)
                      return (
                        <div
                          className="admin-bar__popup-template-item admin-bar__popup-popups"
                          key={`template-${index}`}
                        >
                          popup:{" "}
                          {iconsManager.renderIcon("chevron-admin-bar", {
                            className: "admin-bar__popup-template-chevron"
                          })}
                          <div className="admin-bar__popup-popups-items">
                            {item.templates.map((item, index) => (
                              <div
                                className="admin-bar__popup-popups-item"
                                onClick={this.openTemplate(item.id)}
                                key={`popup-${index}`}
                              >
                                {item.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    else {
                      if(item.template?.name)
                        return (
                          <div
                            className="admin-bar__popup-template-item"
                            key={`template-${index}`}
                            onClick={this.openTemplate(item.template.id)}
                          >
                            {item.template?.name}
                          </div>
                        );
                    }
                  })}
                </div>
              )}
            </div>
            <div className="admin-bar__tool" onClick={this.openPageSettings}>
              {iconsManager.renderIcon("admin-settings-bar", {
                className: "admin-bar__tool-svg"
              })}{" "}
              Page-Settings
            </div>
            {/*<div className="admin-bar__tool">*/}
              {/*{iconsManager.renderIcon('admin-bar3', {className: "admin-bar__tool-svg"})} Clear Cache*/}
            {/*</div>*/}

            <div
              className="admin-bar__tool"
              onClick={() => {this.toggleVisiblePopupHistory(); this.getUserHistory();}}
              ref={this.popupHistoryRef}
            >
              User-History
              {this.state.visiblePopupHistory && (
                <div className="admin-bar__popup-template admin-bar__popup-history">
                  <Scrollbars
                    autoHeight={true}
                    autoHeightMax='500px'
                  >
                    {this.state.arrayRevisions && this.state.arrayRevisions.map((item, index) => {
                      let secondsAgo = (Date.now() - Date.parse(item.updated_at)) / 1000;
                      let dateString;
                      if (secondsAgo < 100) {
                        dateString = `${secondsAgo} seconds ago`;
                      } else if (secondsAgo < 6000) {
                        dateString = `${Math.floor(secondsAgo / 100)} minutes ago`;
                      } else if (secondsAgo < 144000) {
                        dateString = `${Math.floor(secondsAgo / 6000)} hours ago`;
                      } else if (secondsAgo < 4320000) {
                        dateString = `${Math.floor(secondsAgo / 144000)} days ago`;
                      } else if (secondsAgo < 51840000) {
                        dateString = `${Math.floor(secondsAgo / 4320000)} months ago`;
                      } else {
                        dateString = `${Math.floor(secondsAgo / 51840000)} years ago`;
                      }

                      return (
                        <div className='history-popup__card' key={index}>
                          <div className="history-popup__card-time">{dateString}</div>
                          <div className="history-popup__card-author">
                            by {item.author}
                          </div>
                        </div>
                      );
                    })}
                  </Scrollbars>
                </div>
              )}
            </div>
            </div>

          <div className="admin-bar__left">

            <div className="admin-bar__search-bar" ref={this.searchContentResult}>
              {this.state.visibleContentResult && (
                <div className="admin-bar__search-result">
                  <pre
                    className="admin-bar__search-content"
                    style={this.state.isHttps ? { paddingBottom: "22px" } : {}}
                    dangerouslySetInnerHTML={{ __html: this.state.contentResult }}
                  />
                  { this.state.isHttps && (
                    <div
                      className="admin-bar__search-button"
                      onClick={this.handleClickCopy}
                    >
                      copy result {iconsManager.renderIcon("copy-icon")}
                    </div>
                  )}
                </div>
              )}

              {this.state.visibleAutocomplete &&
              this.state.filteredOptions.length !== 0 && (
                <div className="admin-bar__autocomplete" ref={this.autocomplete}>
                  {this.state.filteredOptions.map((item, index) => (
                    <div
                      key={index}
                      className="admin-bar__autocomplete-option"
                      onClick={this.handleClickOptions(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
              <input
                className="admin-bar__search"
                value={this.state.valueInput}
                onChange={this.handleInput}
                onKeyDown={this.handleKeyDown}
                onFocus={this.onFocus}
                ref={this.searchInput}
                placeholder="source"
              />
              <button
                className="admin-bar__button"
                onClick={this.handleClickSearch}
                onDoubleClick={this.handleDoubleClickSearch}
              >
                test
              </button>
              <button
                disabled={this.state.update}
                className="admin-bar__button-update"
                onClick={this.updateAllBackendResources}
              >
                Update All Backend Resources
              </button>
            </div>

            <div className="admin-bar__profile">
            <span>
              Hello,
              {this.props.data.name ? this.props.data.name : this.props.data.email}
            </span>
              <button className="admin-bar__button"
                      onClick={this.logout}
              >
                Logout
              </button>
            </div>

          </div>

          <div className={'admin-bar__arrow ' + (this.state.barIsOpened ? '' : 'closed')} onClick={this.toggleBar}>
            <div></div>
          </div>
        </div>
      </AdminBarWrapper>
    );
  }
}

export default AdminBar;
