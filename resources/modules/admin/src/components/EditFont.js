import React from 'react';
import FontsForm from './FontsForm';

export class EditFont extends React.Component {
    state = {
        editFont: false,
    }

    editFontOnOff = () => {
        this.setState({
            editFont: true,
        })
    }

    render() {
        return (
            <div className="edit-font">
                <div className="custom-fonts__title">Edit Font<button className="custom-fonts__btn custom-fonts__btn_add-new">Add new</button></div>
                <div className="edit-font__content">
                    <div className="edit-font__content-main">
                        <input className="edit-font__content-input" />
                        <div className="edit-font__content-subtitle">Manage Your Font Files</div>
                        <div className="edit-font__content-font-editing-line">
                            <span className="edit-font__content-font-editing-line__element"><span className="edit-font__content-font-editing-line__element_property">Weight:</span>Normal</span>
                            <span className="edit-font__content-font-editing-line__element"><span className="edit-font__content-font-editing-line__element_property">Style:</span>Normal</span>
                            <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_description">Elementor Is Making The Web Beautiful</span>
                            <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_edit">Edit</span>
                            <span className="edit-font__content-font-editing-line__element edit-font__content-font-editing-line__element_delete">Delete</span>
                        </div>
                        <FontsForm editFont={this.state.editFont} />
                        <button onClick={this.editFontOnOff} className="edit-font__content-main-btn">ADD FONT VARIATION</button>
                    </div>
                    <div className="edit-font__content-publish">
                        <div className="edit-font__content-publish-header">
                            <span className="edit-font__content-publish-title">Publish</span>
                        </div>
                        <div className="edit-font__content-publish-body">
                            <span className="edit-font__content-publish-trash">Move to Trash</span>
                            <button className="edit-font__content-publish-btn">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}