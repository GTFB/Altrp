import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";

const fontWeightOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const fontStyleOptions = ['normal', 'italic', 'oblique'];

class FontsForm extends Component {
  state = {
    fontFamily: '',
    fontWeight: '400',
    fontStyle: 'normal',
    woffFile: null,
    woff2File: null,
    ttfFile: null,
    svgFile: null,
    eotFile: null
  };

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  postFont = e => {
    e.persist();
    new Resource({ route: '/admin/ajax/media' })
      .postFiles(e.target.files)
      .then(res => this.setState({ [e.target.name]: res[0].url}));
  }

  submitHandler = e => {
    const { fontFamily, fontWeight, fontStyle, woffFile, woff2File, ttfFile, svgFile, eotFile } = this.state;

    e.preventDefault();
    if (!woffFile && !woff2File && !ttfFile && !svgFile && !eotFile) {
      return alert('Upload font file')
    }

    const data = {};
    for (const key in this.state) {
      if (this.state[key]) { 
        data[key] = this.state[key];
      }
    }
    console.log(data)
  }

  render() {
    const { fontFamily, fontWeight, fontStyle, woffFile, woff2File, ttfFile, svgFile, eotFile  } = this.state;
    return <div className="admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Assets / Custom Fonts</a>
        </div>
      </div>
      <div className="admin-content">
        <form className="admin-form field-form" onSubmit={this.submitHandler}>
          <div className="form-group">
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
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="fontWeight">Weight</label>
              <select
                id="fontWeight"
                required
                name="fontWeight"
                value={fontWeight}
                onChange={this.changeHandler}
                className="form-control"
              >
                {fontWeightOptions.map(value => <option value={value} key={value}>{value}</option>)}
              </select>
            </div>

            <div className="form-group col-6">
              <label htmlFor="fontStyle">Style</label>
              <select
                id="fontStyle"
                required
                name="fontStyle"
                value={fontStyle}
                onChange={this.changeHandler}
                className="form-control"
              >
                {fontStyleOptions.map(value => <option value={value} key={value}>{value}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group d-flex justify-content-between">
            <label>WOFF File</label>
            <input
              placeholder="Input URL or upload file"
              type="text"
              name="woffFile"
              value={typeof woffFile === "string" ? woffFile : ''}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            />
            <input
              id="woffFile"
              name="woffFile"
              type="file"
              accept=".woff"
              onChange={this.postFont}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label>WOFF2 File</label>
            <input
              placeholder="Input URL or upload file"
              type="text"
              name="woff2File"
              value={typeof woff2File === "string" ? woff2File : ''}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            />
            <input
              id="woff2File"
              name="woff2File"
              type="file"
              accept=".woff2"
              onChange={this.postFont}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label>TTF File</label>
            <input
              placeholder="Input URL or upload file"
              type="text"
              name="ttfFile"
              value={typeof ttfFile === "string" ? ttfFile : ''}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            />
            <input
              id="ttfFile"
              name="ttfFile"
              type="file"
              accept=".ttf"
              onChange={this.postFont}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label>SVG File</label>
            <input
              placeholder="Input URL or upload file"
              type="text"
              name="svgFile"
              value={typeof svgFile === "string" ? svgFile : ''}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            />
            <input
              id="svgFile"
              name="svgFile"
              type="file"
              accept=".svg"
              onChange={this.postFont}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label>EOT File</label>
            <input
              placeholder="Input URL or upload file"
              type="text"
              name="eotFile"
              value={typeof eotFile === "string" ? eotFile : ''}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            />
            <input
              id="eotFile"
              name="eotFile"
              type="file"
              accept=".eot"
              onChange={this.postFont}
            />
          </div>

          <button className="btn btn_success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  }
}

export default FontsForm;