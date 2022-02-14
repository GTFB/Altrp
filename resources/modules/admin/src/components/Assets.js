import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { iconsManager } from "../js/helpers";
import Resource from "../../../editor/src/js/classes/Resource";
import { ImageDetail } from "./ImageDetail";
import { FontsDetail } from "./FontsDetail";
import IconUpload from "./../svgs/upload.svg"
import UserTopPanel from "./UserTopPanel";

class Assets extends Component {
  constructor(props) {
    super(props);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.isActiveLink = this.isActiveLink.bind(this);
    this.changeUrlForTab = this.changeUrlForTab.bind(this);
    this.state = {
      uploaderClasses: 'admin-assets__uploader uploader',
      uploadActive: false,
      assets: [],
      activeHeader: 0,
      acceptInput: '',
      itemDeleteClasses: 'item__delete',
      activeLink: '',
      imageId: null,
      fontId: null,
      havePreviousImage: true,
      haveNextImage: true,
      haveNextFont: true,
      havePreviousFont: true,
      imageSettings: []
    };
    this.typesFiles = {
      images: ['png', 'gif', 'jpg', 'jpeg', 'webp'],
      svgs: ['svg'],
      fonts: ['ttf', 'otf', 'woff', 'woff2', 'eot'],
      archives: ['zip', 'rar'],
      documents: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'odt', 'ods', 'odp'],
      medias: ['wav', 'mp3', 'mp4', 'avi', 'webm'],
      others: ['']
    };
    this.resource = new Resource({ route: '/admin/ajax/media' });
    this.imageResize = new Resource({route: "/admin/ajax/media-resize-all-images"} );
    this.imagesSettings = new Resource({route: "/admin/ajax/media_settings"} );
  }

  deleteClick(e) {
    if (confirm('Are You Sure')) {
      let assetId = e.currentTarget.dataset.assetid;
      this.setState(state => {
        return { ...state, itemDeleteClasses: 'item__delete altrp-disabled' }
      });
      this.resource.delete(assetId).then(res => {
        if (res.success) {
          let newAssets = [...this.state.assets];
          newAssets = _.filter(newAssets, item => !(item.id === Number(assetId)));
          this.setState(state => {
            return { ...state, assets: newAssets, itemDeleteClasses: 'item__delete' };
          })
        }
      });
    }
  }
  updateAssets(files) {
    this.resource.postFiles(files).then(res => {
      if (res.length) {
        const activeLink = this.changeUrlForTab();
        this.filterAssets(activeLink);
      }
    })
  }
  getAsset = (assetId) => {
    // get request by asset id
    return this.resource.get(assetId)
  }
  getAuthorList = () => {
    return this.resource.getAuthorList()
  }
  updateAsset = (assetId, data) => {
    // update request by asset id
    return this.resource.put(assetId, data)
  }
  deleteAsset = (id) => {
    this.setState(state => {
      return { ...state, itemDeleteClasses: 'item__delete altrp-disabled' }
    });
    this.resource.delete(id).then(res => {
      if (res.success) {
        let newAssets = [...this.state.assets];
        newAssets = _.filter(newAssets, item => !(item.id === Number(id)));
        this.setState(state => {
          return { ...state, assets: newAssets, itemDeleteClasses: 'item__delete', imageId: null, fontId: null };
        })
      }
    });
  }
  onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.updateAssets(e.dataTransfer.files);
    this.setState(state => {
      return { ...state, uploaderClasses: 'admin-assets__uploader uploader' }
    });
  }
  async componentDidMount() {
    let settings = await this.imagesSettings.getAll()
    this.setState(state => ({
      ...state,
      imageSettings: settings
    }))

    const activeLink = this.changeUrlForTab();
    this.filterAssets(activeLink);

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

  componentDidUpdate() {
    this.changeUrlForTab();
  }
  onChange(e) {
    this.updateAssets(e.target.files);
  }
  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState(state => {
      return { ...state, uploaderClasses: 'admin-assets__uploader uploader uploader_drag-over' }
    });
  }
  onDragLeave() {
    this.setState(state => {
      return { ...state, uploaderClasses: 'admin-assets__uploader uploader' }
    });
  }
  isActiveLink(linkName) {
    return (_, location) => {
      const arrayPathname = location.pathname.split('/');
      const currentLink = arrayPathname[arrayPathname.length - 1];
      if (currentLink === linkName) return true;
      return false;
    }
  }
  onFilterAssets(activeLink) {
    return () => this.filterAssets(activeLink);

  }

  resizeAllImages = async () => {
    await this.imageResize.post()
  }

  filterAssets(activeLink) {
    this.setState(state => {
      return { ...state, acceptInput: `.${this.typesFiles[activeLink].join(', .')}` }
    });
    let filterResource = new Resource({ route: `/admin/ajax/media?type=${activeLink.slice(0, -1)}` });
    filterResource.getAll().then(res => {
      this.setState(state => {
        return { ...state, assets: res }
      })
    });
    this.setState((state => {
      return { ...state, activeLink }
    }));
  }
  changeUrlForTab() {
    const { location, history } = this.props;
    this.path = location.pathname;
    const arrayPathname = location.pathname.split('/');
    if (arrayPathname[arrayPathname.length - 1] === 'assets') {
      history.push(`${this.path}/images`);
      return 'images';
    } else {
      const activeLink = arrayPathname.pop();
      this.path = arrayPathname.join('/');
      return activeLink;
    }
  }
  checkingFirstOrLastDocument(id) {
    let indexCurrentDocumentInArray = this.state.assets.findIndex(item => item.id == id)
    if (indexCurrentDocumentInArray === 0) {
      this.setState({
        havePreviousImage: false,
      })
    } else if (indexCurrentDocumentInArray === this.state.assets.length - 1) {
      this.setState({
        haveNextImage: false,
      })
    } else {
      this.setState({
        haveNextImage: true,
        havePreviousImage: true,
      })
    }
  }
  openImageDetail(id) {
    this.checkingFirstOrLastDocument(id)
    this.setState({ imageId: id })
  }
  nextImageDetail = () => {
    let indexCurrentImageInArray = this.state.assets.findIndex(item => item.id == this.state.imageId)
    let indexNextImageInArray = indexCurrentImageInArray + 1
    this.checkingFirstOrLastDocument(this.state.assets[indexNextImageInArray].id)
    this.setState({ imageId: this.state.assets[indexNextImageInArray].id })
  }
  prevImageDetail = () => {
    let indexCurrentImageInArray = this.state.assets.findIndex(item => item.id == this.state.imageId)
    let indexPrevImageInArray = indexCurrentImageInArray - 1
    this.checkingFirstOrLastDocument(this.state.assets[indexPrevImageInArray].id)
    this.setState({ imageId: this.state.assets[indexPrevImageInArray].id })
  }
  closeImageDetail = () => {
    this.setState({
      imageId: null,
      haveNextImage: true,
      havePreviousImage: true,
    })
  }
  openDocumentDetail(id) {
    this.checkingFirstOrLastDocument(id)
    this.setState({ fontId: id })
  }
  nextFontDetail = () => {
    let indexCurrentFontInArray = this.state.assets.findIndex(item => item.id == this.state.fontId)
    let indexNextFontInArray = indexCurrentFontInArray + 1
    this.checkingFirstOrLastDocument(this.state.assets[indexNextFontInArray].id)
    this.setState({ fontId: this.state.assets[indexNextFontInArray].id })
  }
  prevFontDetail = () => {
    let indexCurrentFontInArray = this.state.assets.findIndex(item => item.id == this.state.fontId)
    let indexPrevFontInArray = indexCurrentFontInArray - 1
    this.checkingFirstOrLastDocument(this.state.assets[indexPrevFontInArray].id)
    this.setState({ fontId: this.state.assets[indexPrevFontInArray].id })
  }
  closeFontDetail = () => {
    this.setState({
      fontId: null,
      haveNextFont: true,
      havePreviousFont: true,
    })
  }

  toggleUploadLoader = () => {
    this.setState({
      uploadActive: !this.state.uploadActive
    })
  }

  render() {
    let UploadIcon = iconsManager().getIconComponent('upload');
    let CloseIcon = iconsManager().getIconComponent('close');
    let AviIcon = iconsManager().getIconComponent('avi');
    return <div className="admin-assets admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">Assets</a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">All Assets</span>
          </div>
          <button className="btn" onClick={this.toggleUploadLoader}>{this.state.uploadActive ? "Close file uploader" : "Open file uploader"}</button>
          {this.state.imageSettings.length > 0 && (
            <button onClick={this.resizeAllImages} style={{marginLeft: '10px'}} className="btn">Resize All Image</button>
          )}
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content assets-content">
        {this.state.uploadActive && (
          <div className={this.state.uploaderClasses}
               onDragLeave={this.onDragLeave}
               onDrop={this.onDrop}
               onDragOver={this.onDragOver}>
            <label className="uploader__label d-flex flex-column align-items-center">
              <IconUpload width={100} height={100} className="icon" />
              <input
                type="file"
                accept={this.state.acceptInput}
                multiple={true}
                onChange={this.onChange}
                className="uploader__input" />
              <span className="uploader__text">
              Drag or Choose File
            </span>
            </label>
          </div>
        )}
        <div className="custom-tab__tabs mt-4 upload__marginBottom">
          <NavLink
            className="custom-tab__tab"
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/images`}
            isActive={this.isActiveLink('images')}
            onClick={this.onFilterAssets('images')}
          >Images</NavLink>
          <NavLink
            className="custom-tab__tab"
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/documents`}
            isActive={this.isActiveLink('documents')}
            onClick={this.onFilterAssets('documents')}
          >Documents</NavLink>
          <NavLink
            className="custom-tab__tab"
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/fonts`}
            isActive={this.isActiveLink('fonts')}
            onClick={this.onFilterAssets('fonts')}
          >Fonts</NavLink>
          <NavLink
            className="custom-tab__tab"
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/svgs`}
            isActive={this.isActiveLink('svgs')}
            onClick={this.onFilterAssets('svgs')}
          >Svgs</NavLink>
          <NavLink
            className="custom-tab__tab"
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/archives`}
            isActive={this.isActiveLink('archives')}
            onClick={this.onFilterAssets('archives')}
          >Archives</NavLink>
          <NavLink
            className="custom-tab__tab"
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/medias`}
            isActive={this.isActiveLink('medias')}
            onClick={this.onFilterAssets('medias')}
          >Medias</NavLink>
          <NavLink
            className="custom-tab__tab"
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/others`}
            isActive={this.isActiveLink('others')}
            onClick={this.onFilterAssets('others')}
          >Others</NavLink>
        </div>
        <div className={this.state.activeLink === 'images'
        || this.state.activeLink === 'svgs' ? "admin-assets__list custom-tab__tab-panel assets-shell-blocks__background"
        : "admin-assets__list custom-tab__tab-panel assets-shell-blocks"}>
          {
            this.state.assets.map(asset => {
              return (
                <div key={asset.id} className={this.state.activeLink === 'images' || this.state.activeLink === 'svgs' ? "assets-shell-background" : "assets-shell"}>

                  <div className="assets-list__item item" >
                    {(() => {
                        if (this.state.activeLink === 'images' || this.state.activeLink === 'svgs') {
                          return (
                            <div onClick={() => this.openImageDetail(asset.id)} className="item__background"
                                 style={{ 'backgroundImage': `url('${asset.url}')` }} />
                          )
                        } else {
                          let typeIcon = asset.url.split('.').pop();
                          let IconFile = iconsManager().getIconComponent('file');
                          this.typesFiles[this.state.activeLink].forEach((type) => {
                            if (typeIcon === type) {
                              IconFile = iconsManager().getIconComponent(typeIcon);
                              return <IconFile className="item__background-icon" />
                            }
                          });
                          return <IconFile onClick={() => this.openDocumentDetail(asset.id)} className="item__background-icon" />
                        }
                      }
                    )()}
                    <button className={this.state.itemDeleteClasses}
                            data-assetid={asset.id}
                            title="Delete"
                            onClick={this.deleteClick}>
                      <CloseIcon className="item__delete-icon" />
                    </button>
                  </div>

                </div>
              )
            }
            )
          }
        </div>
      </div>
      <div>
        <ImageDetail getAuthorList={this.getAuthorList} havePreviousImage={this.state.havePreviousImage} haveNextImage={this.state.haveNextImage} updateAsset={this.updateAsset} getAsset={this.getAsset} deleteAsset={this.deleteAsset} imageId={this.state.imageId} closeImageDetail={this.closeImageDetail} nextImageDetail={this.nextImageDetail} prevImageDetail={this.prevImageDetail} />
        <FontsDetail nextFontDetail={this.nextFontDetail} prevFontDetail={this.prevFontDetail} closeFontDetail={this.closeFontDetail} getAuthorList={this.getAuthorList} getAsset={this.getAsset} fontId={this.state.fontId} deleteAsset={this.deleteAsset} />
      </div>
    </div>;
  }

}

export default withRouter(Assets);
