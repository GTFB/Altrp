import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import DeleteIcon from '@material-ui/icons/Delete';
import {FontUpload} from './FontUpload';
import { withRouter } from "react-router";
import { compose } from "redux";

const fontWeightOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const fontStyleOptions = ['normal', 'italic', 'oblique'];

class FontsForm extends Component {
  state = {
    fontFamily: '',
    fontWeight: '',
    fontStyle: '',
    woffFile: '',
    woff2File: '',
    ttfFile: '',
    svgFile: '',
    eotFile: '',
    fontsLibrary: []
  };

  componentDidMount() {
    new Resource({ route: `/admin/ajax/media?type=font` })
      .getAll()
      .then(fontsLibrary => this.setState({ fontsLibrary }));
  }

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  postFont = e => {
    e.persist();
    new Resource({ route: '/admin/ajax/media' })
      .postFiles(e.target.files)
      .then(res => this.setState({ [e.target.name]: res[0].url, fontsLibrary: [...this.state.fontsLibrary, res[0]] }));
  }

  submitHandler = e => {
    const { woffFile, woff2File, ttfFile, svgFile, eotFile } = this.state;

    e.preventDefault();
    // if (!woffFile && !woff2File && !ttfFile && !svgFile && !eotFile) {
    //   return alert('Upload font file')
    // }

    const { fontsLibrary, ...restProps } = this.state;
    const data = {};

    for (const key in restProps) {
      if (restProps[key]) {
        data[key] = restProps[key];
      }
    }
    
    if (this.props.match.path.indexOf("edit-font") !== -1) {
      this.props.addFontVariation(data)
    }

    // if (this.props.match.path.indexOf("add-new-font") !== -1) {
    //   this.props.addNewFont(data)
    // }
    console.log(data)
  }

  render() {
    const { fontFamily, fontWeight, fontStyle, woffFile, woff2File, ttfFile, svgFile, eotFile, fontsLibrary } = this.state;

    if (!this.props.editFont) return null;

    return <div className="admin-page">
      {/* <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Assets / Custom Fonts</a>
        </div>
      </div> */}
      <div className="admin-content admin-content-fonts-form">
        <form className="admin-form field-form" onSubmit={this.submitHandler}>
          {/* <div className="form-group">
            <label htmlFor="name">Title</label>
            <input
              required
              type="text"
              id="fontFamily"
              name="fontFamily"
              value={fontFamily}
              onChange={this.changeHandler}
              className="form-control"
            />
          </div> */}
          {/* <div className="row"> */}
          {/* <div className="form-group col-6">
              <label htmlFor="fontWeight">Weight</label> */}
          <div className="edit-font__content-font-editing-line">
            <span className="edit-font__content-font-editing-line__element"><span className="edit-font__content-font-editing-line__element_property">Weight:</span><select
              id="fontWeight"
              name="fontWeight"
              value={fontWeight}
              onChange={this.changeHandler}
              className="edit-font__content-font-editing-line__element-value"
            >
              <option value=""></option>
              {fontWeightOptions.map(value => <option value={value} key={value}>{value}</option>)}
            </select></span>
            <span className="edit-font__content-font-editing-line__element"><span className="edit-font__content-font-editing-line__element_property">Style:</span><select
              id="fontStyle"
              name="fontStyle"
              value={fontStyle}
              onChange={this.changeHandler}
              className="edit-font__content-font-editing-line__element-value"
            >
              <option value=""></option>
              {fontStyleOptions.map(value => <option value={value} key={value}>{value}</option>)}
            </select></span>
            <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_description">Elementor Is Making The Web Beautiful</span>
            <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_edit" onClick={this.props.editFontOff}>Close</span>
            <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_delete"><DeleteIcon fontSize="small" />Delete</span>
          </div>

          {/* </div> */}

          {/* <div className="form-group col-6">
              <label htmlFor="fontStyle">Style</label> */}

          {/* </div>
          </div> */}
          <div className="form-group-wrap">
            <div className="form-group d-flex justify-content-between">
              <div className="form-group-input-label">WOFF File</div>
              <select
                name="woffFile"
                value={woffFile}
                onChange={this.changeHandler}
                className="form-control w-auto flex-grow-1 mx-2"
              >
                <option value="">The Web Open Font Format, Used by Modern Browsers</option>
                {fontsLibrary
                  .filter(({ filename }) => filename.endsWith(".woff"))
                  .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
              </select>
              <button className="edit-font__content-main-btn edit-font__content-main-btn-upload">UPLOAD</button>
              {/* <input
                id="woffFile"
                name="woffFile"
                placeholder="Upload"
                type="file"
                accept=".woff"
                onChange={this.postFont}
              /> */}
            </div>

            <div className="form-group d-flex justify-content-between">
              <div className="form-group-input-label">WOFF2 File</div>
              <select
                name="woff2File"
                value={woff2File}
                onChange={this.changeHandler}
                className="form-control w-auto flex-grow-1 mx-2"
              >
                <option value="">The Web Open Font Format 2, Used by Super Modern Browsers</option>
                {fontsLibrary
                  .filter(({ filename }) => filename.endsWith(".woff2"))
                  .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
              </select>
              <button className="edit-font__content-main-btn edit-font__content-main-btn-upload">UPLOAD</button>
              {/* <input
                id="woff2File"
                name="woff2File"
                type="file"
                accept=".woff2"
                onChange={this.postFont}
              /> */}
            </div>

            <div className="form-group d-flex justify-content-between">
              <div className="form-group-input-label">TTF File</div>
              <select
                name="ttfFile"
                value={ttfFile}
                onChange={this.changeHandler}
                className="form-control w-auto flex-grow-1 mx-2"
              >
                <option value="">TrueType Fonts, Used for better supporting Safari, Android, iOS</option>
                {fontsLibrary
                  .filter(({ filename }) => filename.endsWith(".ttf"))
                  .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
              </select>
              <button className="edit-font__content-main-btn edit-font__content-main-btn-upload">UPLOAD</button>
              {/* <input
                id="ttfFile"
                name="ttfFile"
                type="file"
                accept=".ttf"
                onChange={this.postFont}
              /> */}
            </div>

            <div className="form-group d-flex justify-content-between">
              <div className="form-group-input-label">SVG File</div>
              <select
                name="svgFile"
                value={svgFile}
                onChange={this.changeHandler}
                className="form-control w-auto flex-grow-1 mx-2"
              >
                <option value="">SVG fonts allow SVG to be used as glyphs when displaying text, Used by Legacy iOS</option>
                {fontsLibrary
                  .filter(({ filename }) => filename.endsWith(".svg"))
                  .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
              </select>
              <button className="edit-font__content-main-btn edit-font__content-main-btn-upload">UPLOAD</button>
              {/* <input
                id="svgFile"
                name="svgFile"
                type="file"
                accept=".svg"
                onChange={this.postFont}
              /> */}
            </div>

            <div className="form-group d-flex justify-content-between">
              <div className="form-group-input-label">EOT File</div>
              <select
                name="eotFile"
                value={eotFile}
                onChange={this.changeHandler}
                className="form-control w-auto flex-grow-1 mx-2"
              >
                <option value="">Embedded OpenType, Used by IE6-IE9 Browsers</option>
                {fontsLibrary
                  .filter(({ filename }) => filename.endsWith(".eot"))
                  .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
              </select>
              <button className="edit-font__content-main-btn edit-font__content-main-btn-upload">UPLOAD</button>
              {/* <input
                id="eotFile"
                name="eotFile"
                type="file"
                accept=".eot"
                onChange={this.postFont}
              /> */}
            </div>
          </div>
          <FontUpload />
          <button className="btn btn_success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  }
}

export default compose(withRouter)(FontsForm);