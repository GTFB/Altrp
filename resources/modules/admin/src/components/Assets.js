import React, {Component} from "react";
import { NavLink, withRouter } from "react-router-dom";

import {iconsManager} from "../js/helpers";
import Resource from "../../../editor/src/js/classes/Resource";

class Assets extends Component {
  constructor(props){
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
      assets: [],
      acceptInput: '',
      itemDeleteClasses: 'item__delete',
      activeLink: '',
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
    this.resource  = new Resource({route: '/admin/ajax/media'});
  }
  
  deleteClick(e){
    let assetId = e.currentTarget.dataset.assetid;
    this.setState(state=>{
      return{...state, itemDeleteClasses: 'item__delete altrp-disabled'}
    });
    this.resource.delete(assetId).then(res=>{
      if(res.success){
        let newAssets = [...this.state.assets];
        newAssets = _.filter(newAssets, item => !(item.id===Number(assetId)));
        this.setState(state=>{
          return{...state, assets: newAssets, itemDeleteClasses: 'item__delete'};
        })
      }
    });
  }
  updateAssets(files){
    this.resource.postFiles(files).then(res=>{
      if(res.length){
        const activeLink = this.changeUrlForTab();
        this.filterAssets(activeLink);
      }
    })
  }
  onDrop(e){
    e.preventDefault();
    e.stopPropagation();
    this.updateAssets(e.dataTransfer.files);
    this.setState(state=>{
      return {...state, uploaderClasses: 'admin-assets__uploader uploader'}
    });
  }
  componentDidMount(){
    const activeLink = this.changeUrlForTab();
    this.filterAssets(activeLink);
  }
  componentDidUpdate(){
    this.changeUrlForTab();
  }
  onChange(e){
    this.updateAssets(e.target.files);
  }
  onDragOver(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState(state=>{
      return {...state, uploaderClasses: 'admin-assets__uploader uploader uploader_drag-over'}
    });
  }
  onDragLeave(){
    this.setState(state=>{
      return {...state, uploaderClasses: 'admin-assets__uploader uploader'}
    });
  }
  isActiveLink(linkName) {
    return (_, location) => {
      const arrayPathname = location.pathname.split('/');
      const currentLink = arrayPathname[arrayPathname.length - 1];
      if(currentLink === linkName) return true;
      return false;
    }
  }
  onFilterAssets(activeLink) {
    return () => this.filterAssets(activeLink);
    
  }
  filterAssets(activeLink) {
    this.setState(state => {
      return {...state, acceptInput: `.${this.typesFiles[activeLink].join(', .')}` }
    });
    let filterResource = new Resource({route: `/admin/ajax/media?type=${activeLink.slice(0, -1)}`});
    filterResource.getAll().then(res=>{
      this.setState(state=>{
        return {...state, assets: res}
      })
    });
    this.setState((state=> {
      return { ...state, activeLink }
    }));
  }
  changeUrlForTab() {
    const { location, history } = this.props;
    this.path = location.pathname;
    const arrayPathname = location.pathname.split('/');
    if(arrayPathname[arrayPathname.length -1] === 'assets'){
      history.push(`${this.path}/images`);
      return 'images';
    } else {
      const activeLink = arrayPathname.pop();
      this.path = arrayPathname.join('/');
      return activeLink;
    }
  }
  render() {
    let UploadIcon = iconsManager().getIconComponent('upload');
    let CloseIcon = iconsManager().getIconComponent('close');
    let AviIcon =  iconsManager().getIconComponent('avi');
    return <div className="admin-assets admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Assets</a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">All Assets</span>
        </div>
      </div>
      <div className="admin-content">
        <div className={this.state.uploaderClasses}
             onDragLeave={this.onDragLeave}
             onDrop={this.onDrop}
             onDragOver={this.onDragOver}>
          <label className="uploader__label d-flex flex-column align-items-center">
            <UploadIcon width={100} height={100} className="icon"/>
            <input 
              type="file"
              accept={this.state.acceptInput}
              multiple={true}
              onChange={this.onChange}
              className="uploader__input"/>
            <span className="uploader__text text text_bold">
              Drag or Choose File
            </span>
          </label>
        </div>
        <div className="custom-tab__tabs mt-4">
          <NavLink 
            className="custom-tab__tab" 
            activeClassName="custom-tab__tab--selected"  
            to={`${this.path}/images`}
            isActive={this.isActiveLink('images')}
            onClick={this.onFilterAssets('images')}
          >IMAGES</NavLink>
          <NavLink 
            className="custom-tab__tab" 
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/documents`}
            isActive={this.isActiveLink('documents')}
            onClick={this.onFilterAssets('documents')}
          >DOCUMENTS</NavLink>
          <NavLink 
            className="custom-tab__tab" 
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/fonts`}
            isActive={this.isActiveLink('fonts')}
            onClick={this.onFilterAssets('fonts')}
          >FONTS</NavLink>
          <NavLink 
            className="custom-tab__tab" 
            activeClassName="custom-tab__tab--selected" 
            to={`${this.path}/svgs`}
            isActive={this.isActiveLink('svgs')}
            onClick={this.onFilterAssets('svgs')}
          >SVGS</NavLink>
          <NavLink 
            className="custom-tab__tab" 
            activeClassName="custom-tab__tab--selected" 
            to={`${this.path}/archives`}
            isActive={this.isActiveLink('archives')}
            onClick={this.onFilterAssets('archives')}
          >ARCHIVES</NavLink>
          <NavLink 
            className="custom-tab__tab" 
            activeClassName="custom-tab__tab--selected"
            to={`${this.path}/medias`}
            isActive={this.isActiveLink('medias')}
            onClick={this.onFilterAssets('medias')}
          >MEDIAS</NavLink>
          <NavLink 
            className="custom-tab__tab" 
            activeClassName="custom-tab__tab--selected" 
            to={`${this.path}/others`}
            isActive={this.isActiveLink('others')}
            onClick={this.onFilterAssets('others')}
          >OTHERS</NavLink>
        </div>
        <div className="admin-assets__list custom-tab__tab-panel p-4 assets-list d-flex flex-wrap">
          {
            this.state.assets.map(asset=>{
              return (
                <div className="assets-list__item item col-1" key={asset.id} >
                  {(() => {
                    if(this.state.activeLink === 'images' ||
                      this.state.activeLink === 'svgs') 
                      return (
                        <div className="item__background"
                          style={{'backgroundImage': `url('${asset.url}')`}}/>
                      )
                    let typeIcon = asset.url.split('.').pop();
                    let IconFile = iconsManager().getIconComponent('file');
                    this.typesFiles[this.state.activeLink].forEach((type) => {
                      if(typeIcon === type) {
                        IconFile = iconsManager().getIconComponent(typeIcon);
                        return <IconFile className="item__icon-background" />
                      }
                    });
                    return <IconFile className="item__icon-background" />
                  }
                  )()}
                  <button className={this.state.itemDeleteClasses}
                          data-assetid={asset.id}
                          title="Delete"
                          onClick={this.deleteClick}>
                    <CloseIcon className="item__delete-icon"/>
                  </button>
                </div>
              )}
            )
          }
        </div>
      </div>
    </div>;
  }

}

export default withRouter(Assets);