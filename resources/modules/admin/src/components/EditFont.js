import React from 'react';
import FontsForm from './FontsForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { EditFontElementPublish } from './EditFontElementPublish';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import AltrpMeta from '../../../../modules/editor/src/js/classes/AltrpMeta';
import { connect } from "react-redux";
import { compose } from "redux";
import {getCustomFonts} from '../js/store/custom-fonts/actions';

class EditFont extends React.Component {
    state = {
        editFont: false,
        publishMaxSize: false,
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

    addFontVariation = async (fontVariation) => {
        console.log(this.props.metaValue)
        let meta = await AltrpMeta.getMetaByName("custom_fonts")
        let font = this.props.metaValue
        const currentFontId = this.props.match.params.id
        const indexCurrentFont = font.findIndex(item => item.id == currentFontId)
        let currentFont = font[indexCurrentFont]
        currentFont.variation = currentFont.variations.push(fontVariation)
        meta.setMetaValue(font)
        await meta.save()
        meta = await AltrpMeta.getMetaByName("custom_fonts")
        const metaValue = await meta.getMetaValue()
        this.props.getCustomFonts(metaValue)
      }


    render() {
        let fontVariations = null;

        if (this.props.metaValue !== null) {
            const indexCurrentFont = this.props.metaValue.findIndex(item => item.id == this.props.match.params.id)
            const currentFont = this.props.metaValue[indexCurrentFont]
            fontVariations = currentFont.variations.map(v => (
                <div className="edit-font__content-font-editing-line">
                    <span className="edit-font__content-font-editing-line__element"><span className="edit-font__content-font-editing-line__element_property">Weight:</span>{v.fontWeight}</span>
                    <span className="edit-font__content-font-editing-line__element"><span className="edit-font__content-font-editing-line__element_property">Style:</span>{v.fontStyle}</span>
                    <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_description">Elementor Is Making The Web Beautiful</span>
                    <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_edit"><EditIcon fontSize="small" />Edit</span>
                    <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_delete"><DeleteIcon fontSize="small" />Delete</span>
                </div>
            ))
        }

        return (
            <div className="edit-font">
                <div className="custom-fonts__title">Edit Font<Link to="/admin/assets/add-new-font"><button className="custom-fonts__btn custom-fonts__btn_add-new">Add new</button></Link></div>
                <div className="edit-font__content">
                    <div className="edit-font__content-main">
                        <input className="edit-font__content-input" />
                        {this.state.publishMaxSize ? <div className="edit-font__content-publish edit-font__content-publish_max">
                            <EditFontElementPublish changePublishSizeMax={this.changePublishSizeMax} changePublishSizeMin={this.changePublishSizeMin} />
                        </div> : null}
                        <div className="edit-font__content-subtitle">Manage Your Font Files</div>
                        {fontVariations}
                        <FontsForm addFontVariation={this.addFontVariation} editFont={this.state.editFont} editFontOff={this.editFontOff} />
                        <button onClick={this.editFontOn} className="edit-font__content-main-btn">ADD FONT VARIATION</button>
                    </div>
                    {!this.state.publishMaxSize ? <div className="edit-font__content-publish">
                        <EditFontElementPublish changePublishSizeMax={this.changePublishSizeMax} changePublishSizeMin={this.changePublishSizeMin} />
                    </div> : null}
                </div>
            </div>
        )
    }
}
  
  export default compose(
    connect(null, { getCustomFonts }),
    withRouter
  )(EditFont);
