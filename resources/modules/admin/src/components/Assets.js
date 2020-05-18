import React, {Component} from "react";
import {iconsManager} from "../js/helpers";
import Resource from "../../../editor/src/js/classes/Resource";


export default class Assets extends Component {
  constructor(props){
    super(props);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      uploaderClasses: 'admin-assets__uploader uploader'
    };
    this.resource  = new Resource({route: '/admin/ajax/media'});
  }
  async onDrop(e){
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.files);
    let res = await this.resource.postFiles(e.dataTransfer.files[0]);
    console.log(res);
    this.setState(state=>{
      return {...state, uploaderClasses: 'admin-assets__uploader uploader'}
    });
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
                   className="uploader__input"/>
            <span className="uploader__text text text_bold">
              Drag or Choose File
            </span>
          </label>
        </div>
      </div>
    </div>;
  }

}
