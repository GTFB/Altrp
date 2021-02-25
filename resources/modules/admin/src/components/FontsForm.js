import React, { Component } from "react";

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

  submitHandler = e => {
    const { fontFamily, fontWeight, fontStyle, woffFile, woff2File, ttfFile, svgFile, eotFile } = this.state;

    e.preventDefault();
    if (!woffFile && !woff2File && !ttfFile && !svgFile && !eotFile) {
      return alert('Upload font file')
    }

    const data = new FormData();
    for (const key in this.state) {
      if (this.state[key]) { 
        data.append(key, this.state[key])
      }
    }
    console.log(data)
  }

  render() {
    const { fontFamily, fontWeight, fontStyle } = this.state;
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
            <label htmlFor="fontStyle">WOFF File</label>
            <input
              id="woffFile"
              name="woffFile"
              type="file"
              accept=".woff"
              onChange={e => this.setState({ woffFile: e.target.files[0] })}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label htmlFor="fontStyle">WOFF2 File</label>
            <input
              id="woff2File"
              name="woff2File"
              type="file"
              accept=".woff2"
              onChange={e => this.setState({ woff2File: e.target.files[0] })}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label htmlFor="fontStyle">TTF File</label>
            <input
              id="ttfFile"
              name="ttfFile"
              type="file"
              accept=".ttf"
              onChange={e => this.setState({ ttfFile: e.target.files[0] })}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label htmlFor="fontStyle">SVG File</label>
            <input
              id="svgFile"
              name="svgFile"
              type="file"
              accept=".svg"
              onChange={e => this.setState({ svgFile: e.target.files[0] })}
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <label htmlFor="fontStyle">EOT File</label>
            <input
              id="eotFile"
              name="eotFile"
              type="file"
              accept=".eot"
              onChange={e => this.setState({ eotFile: e.target.files[0] })}
            />
          </div>

          <button className="btn btn_success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  }
}

export default FontsForm;