import React from 'react';
import FontsForm from './FontsForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { EditFontElementPublish } from './EditFontElementPublish';

export class AddNewFont extends React.Component {
    state = {
        editFont: false,
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

    addNewFont = async (newFont) => {
        // let meta = await AltrpMeta.getMetaByName("custom_fonts")
        // let fonts = this.props.metaValue
        // //здесь надо запушить новый фонт в массив
        // meta.setMetaValue(fonts)
        // await meta.save()
        // meta = await AltrpMeta.getMetaByName("custom_fonts")
        // const metaValue = await meta.getMetaValue()
        // this.props.getCustomFonts(metaValue)
      }

    render() {
        return ( 
            <div className="edit-font">
                <div className="custom-fonts__title">Add New Font</div>
                <div className="edit-font__content">
                    <div className="edit-font__content-main">
                        <input className="edit-font__content-input edit-font__content-input-add-font" placeholder="Enter Font Family" />
                        {this.state.publishMaxSize ? <div className="edit-font__content-publish edit-font__content-publish_max">
                            <EditFontElementPublish changePublishSizeMax={this.changePublishSizeMax} changePublishSizeMin={this.changePublishSizeMin} />
                        </div> : null}
                        <div className="edit-font__content-subtitle">Manage Your Font Files</div>
                        <FontsForm addNewFont={this.addNewFont} editFont={this.state.editFont} editFontOff={this.editFontOff} />
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