import React, {Component} from "react";
import {iconsManager} from "../js/helpers";
import Resource from "../../../editor/src/js/classes/Resource";



export default class Assets extends Component {
  constructor(props){
    super(props);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.state = {
      uploaderClasses: 'admin-assets__uploader uploader',
      assets: [],
    };
    this.resource  = new Resource({route: '/admin/ajax/media'});
  }
  async deleteClick(e){
    let assetId = e.currentTarget.dataset.assetid;
    this.resource.delete(assetId).then(res=>{
      if(res.success){
        let newAssets = [...this.state.assets];
        newAssets = _.filter(newAssets, item => !(item.id===Number(assetId)));
        this.setState(state=>{
          return{...state, assets: newAssets};
        })
      }
    });
  }
  updateAssets(files){
    this.resource.postFiles(files).then(res=>{
      console.log(res);
      if(res.length){
        let newAssets = res.concat(this.state.assets);
        this.setState(state=>{
          return{...state, assets: newAssets}
        })
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
    this.resource.getAll().then(res=>{
      console.log(res);
      this.setState(state=>{
        return {...state, assets: res}
      })
    });
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
  render() {
    let UploadIcon = iconsManager().getIconComponent('upload');
    let CloseIcon = iconsManager().getIconComponent('close');
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
            <input type="file"
                   accept="image/*"
                   multiple={true}
                   onChange={this.onChange}
                   className="uploader__input"/>
            <span className="uploader__text text text_bold">
              Drag or Choose File
            </span>
          </label>
        </div>
        <div className="admin-assets__list p-4 mt-4 assets-list d-flex flex-wrap">
          {
            this.state.assets.map(asset=>{
              return<div className="assets-list__item item col-1" key={asset.id} >
                <div className="item__background"
                     style={{'backgroundImage': `url('${asset.url}')`}}/>
                <button className="item__delete"
                        data-assetid={asset.id}
                        title="Delete"
                        onClick={this.deleteClick}>
                  <CloseIcon className="item__delete-icon"/>
                </button>
              </div>}
            )
          }
        </div>
      </div>
    </div>;
  }

}
