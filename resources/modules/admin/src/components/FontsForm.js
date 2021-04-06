import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";

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
    if (!woffFile && !woff2File && !ttfFile && !svgFile && !eotFile) {
      return alert('Upload font file')
    }

    const { fontsLibrary, ...restProps} = this.state;
    const data = {};

    for (const key in restProps) {
      if (restProps[key]) {
        data[key] = restProps[key];
      }
    }
    console.log(data)
  }

  render() {
    const { fontFamily, fontWeight, fontStyle, woffFile, woff2File, ttfFile, svgFile, eotFile, fontsLibrary } = this.state;
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
                name="fontWeight"
                value={fontWeight}
                onChange={this.changeHandler}
                className="form-control"
              >
                <option value=""></option>
                {fontWeightOptions.map(value => <option value={value} key={value}>{value}</option>)}
              </select>
            </div>

            <div className="form-group col-6">
              <label htmlFor="fontStyle">Style</label>
              <select
                id="fontStyle"
                name="fontStyle"
                value={fontStyle}
                onChange={this.changeHandler}
                className="form-control"
              >
                <option value=""></option>
                {fontStyleOptions.map(value => <option value={value} key={value}>{value}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group d-flex justify-content-between">
            <label>WOFF File</label>
            <select
              name="woffFile"
              value={woffFile}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            >
              <option value="">Choose URL or upload file</option>
              {fontsLibrary
                .filter(({ filename }) => filename.endsWith(".woff"))
                .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
            </select>
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
            <select
              name="woff2File"
              value={woff2File}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            >
              <option value="">Choose URL or upload file</option>
              {fontsLibrary
                .filter(({ filename }) => filename.endsWith(".woff2"))
                .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
            </select>
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
            <select
              name="ttfFile"
              value={ttfFile}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            >
              <option value="">Choose URL or upload file</option>
              {fontsLibrary
                .filter(({ filename }) => filename.endsWith(".ttf"))
                .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
            </select>
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
            <select
              name="svgFile"
              value={svgFile}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            >
              <option value="">Choose URL or upload file</option>
              {fontsLibrary
                .filter(({ filename }) => filename.endsWith(".svg"))
                .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
            </select>
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
            <select
              name="eotFile"
              value={eotFile}
              onChange={this.changeHandler}
              className="form-control w-auto flex-grow-1 mx-2"
            >
              <option value="">Choose URL or upload file</option>
              {fontsLibrary
                .filter(({ filename }) => filename.endsWith(".eot"))
                .map(({ filename, url }) => <option value={url} key={filename}>{filename}</option>)}
            </select>
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