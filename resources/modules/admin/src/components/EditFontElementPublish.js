import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export class EditFontElementPublish extends React.Component {
    render() {
        return (
            <div>
                <div className="edit-font__content-publish-header">
                    <span className="edit-font__content-publish-title">Publish</span>
                    <div>
                        <button onClick={this.props.changePublishSizeMin} className="edit-font__content-publish-arrow"><KeyboardArrowUpIcon /></button>
                        <button onClick={this.props.changePublishSizeMax} className="edit-font__content-publish-arrow"><KeyboardArrowDownIcon /></button>
                    </div>
                </div>
                <div className="edit-font__content-publish-body">
                    <button type="submit" className="edit-font__content-publish-btn">Update</button>
                    {this.props.pathName.indexOf("edit-font") !== -1 && <span onClick={this.props.deleteFont} className="edit-font__content-publish-trash">Move to Trash</span>}
                </div>
            </div>
        )
    }
}