import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';
import { compose } from "redux";
import { connect } from "react-redux";
import { EditFontElementPublish } from './EditFontElementPublish';
import AltrpMeta from '../../../editor/src/js/classes/AltrpMeta';
import { getCustomFonts } from '../js/store/custom-fonts/actions';
import { generateId } from '../js/helpers';

const fontWeightOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const fontStyleOptions = ['normal', 'italic', 'oblique'];

class AddNewFont extends Component {
    state = {
        fontFamily: '',
        fontWeight: '',
        fontStyle: '',
        woffFile: '',
        woff2File: '',
        ttfFile: '',
        svgFile: '',
        eotFile: '',
        fontsLibrary: [],
        editFont: false,
        publishMaxSize: false,
        fontSavedSuccessfully: false,
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
        // console.log(data)
        this.addNewFont(data)
    }

    addNewFont = async (newFont) => {
        let meta = await AltrpMeta.getMetaByName("custom_fonts")
        let fonts = (this.props.metaValue !== '') ? this.props.metaValue : null
        if (fonts === null) {
            fonts = []
        }
        const idCurrentFont = generateId()
        let configNewFont = {
            id: idCurrentFont,
            fontFamily: newFont.fontFamily,
            variations: [
                {
                    id: generateId(),
                    fontStyle: newFont.fontStyle,
                    fontWeight: newFont.fontWeight,
                    woffFile: newFont.woffFile,
                    woff2File: newFont.woff2File,
                    ttfFile: newFont.ttfFile,
                    svgFile: newFont.svgFile,
                    eotFile: newFont.eotFile,
                }
            ]
        }
        fonts.push(configNewFont)
        meta.setMetaValue(fonts)
        await meta.save()
        meta = await AltrpMeta.getMetaByName("custom_fonts")
        const metaValue = await meta.getMetaValue()
        this.props.getCustomFonts(metaValue)
        this.setState({
            fontSavedSuccessfully: true,
            idCurrentFontForRedirect: idCurrentFont,
        })
    }

    editFontOn = () => {
        this.setState({
            editFont: true,
        })
    }

    editFontOff = () => {
        this.setState({
            editFont: false,
        })
    }

    changePublishSizeMax = () => {
        this.setState({
            publishMaxSize: true,
        })
    }

    changePublishSizeMin = () => {
        this.setState({
            publishMaxSize: false,
        })
    }

    render() {
        const { fontFamily, fontWeight, fontStyle, woffFile, woff2File, ttfFile, svgFile, eotFile, fontsLibrary } = this.state;

        if (this.state.fontSavedSuccessfully) {
            return <Redirect from="/admin/assets/add-new-font" to={`/admin/assets/edit-font/${this.state.idCurrentFontForRedirect}`} />
        }

        return <div className="edit-font">
            <div className="custom-fonts__title">Add New Font</div>
            <div className="edit-font__content">
                <div className="edit-font__content-main">
                    <div className="admin-content admin-content-fonts-form">
                        <form className="admin-form field-form" onSubmit={this.submitHandler}>
                            <input
                                className="edit-font__content-input edit-font__content-input-add-font"
                                placeholder="Enter Font Family"
                                required
                                type="text"
                                id="fontFamily"
                                name="fontFamily"
                                value={fontFamily}
                                onChange={this.changeHandler} />
                            {!this.state.publishMaxSize ? <div className="edit-font__content-publish edit-font__content-publish_min">
                                <EditFontElementPublish pathName={this.props.location.pathname} changePublishSizeMax={this.changePublishSizeMax} changePublishSizeMin={this.changePublishSizeMin} />
                            </div> : null}
                            {this.state.publishMaxSize ? <div className="edit-font__content-publish">
                                <EditFontElementPublish pathName={this.props.location.pathname} changePublishSizeMax={this.changePublishSizeMax} changePublishSizeMin={this.changePublishSizeMin} />
                            </div> : null}
                            <div className="edit-font__content-subtitle">Manage Your Font Files</div>
                            <div className={this.state.editFont ? "add-variatons-open" : "add-variatons-close"}>
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
                                    <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_edit" onClick={this.editFontOff}>Close</span>
                                    <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_delete"><DeleteIcon fontSize="small" />Delete</span>
                                </div>
                                <div className="form-group-wrap">
                                    <div className="form-group d-flex justify-content-between">
                                        <div className="form-group-input-label">WOFF File</div>
                                        <input className="showFontUrl" value={woffFile} />
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
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <div className="form-group-input-label">WOFF2 File</div>
                                        <input className="showFontUrl" value={woff2File} />
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
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <div className="form-group-input-label">TTF File</div>
                                        <input className="showFontUrl" value={ttfFile} />
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
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <div className="form-group-input-label">SVG File</div>
                                        <input className="showFontUrl" value={svgFile} />
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
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <div className="form-group-input-label">EOT File</div>
                                        <input className="showFontUrl" value={eotFile} />
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
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <button onClick={this.editFontOn} className="edit-font__content-main-btn">ADD FONT VARIATION</button>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
  return {
    metaValue: state.customFonts.metaValue
  }
}

export default compose(
    connect(mapStateToProps, { getCustomFonts }),
    withRouter
)(AddNewFont);
