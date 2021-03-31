import React from 'react';
import { Form, Field } from 'react-final-form';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import AutoSave from './AutoSaveImageDetail';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const save = async values => {
    await sleep(1000)
}

export class ImageDetail extends React.Component {
    state = {}

    componentDidUpdate(prevProps) {
        if (prevProps.imageId !== this.props.imageId && this.props.imageId !== null) {
            this.props.getAsset(this.props.imageId).then(data => this.setState(data))
        }
    }

    deleteAsset(imageId) {
        this.props.deleteAsset(imageId)
    }

    render() {
        const { url, created_at, author, filename, media_type, height, width } = this.state

        if (!this.props.imageId) return null;

        return (
            <div>
                <div onClick={this.props.closeImageDetail} className="image-detail_opacity-background"></div>
                    <div className="image-detail">
                        <div className="image-detail_header">
                            <div className="image-detail__title">Attachment details</div>
                            <div className="image-detail__btn-nav-group">
                                {this.props.havePreviousImage
                                    ? <button onClick={this.props.prevImageDetail} className="image-detail__btn-nav"><ArrowBackIosIcon fontSize="small" /></button>
                                    : <button onClick={this.props.prevImageDetail} disabled className="image-detail__btn-nav"><ArrowBackIosIcon fontSize="small" /></button>}
                                {this.props.haveNextImage
                                    ? <button onClick={this.props.nextImageDetail} className="image-detail__btn-nav"><ArrowForwardIosIcon fontSize="small" /></button>
                                    : <button onClick={this.props.nextImageDetail} disabled className="image-detail__btn-nav"><ArrowForwardIosIcon fontSize="small" /></button>}
                                <button onClick={this.props.closeImageDetail} className="image-detail__btn-nav"><CloseIcon fontSize="small" /></button>
                            </div>
                        </div>
                        <div className="image-detail__content">
                            <div className="image-detail__image-display">
                                <img className="image-detail__image" src={url} draggable="false" alt="" />
                                <button className="image-detail__btn image-detail__btn-edit-image">Edit image</button>
                            </div>
                            <div className="image-detail__editing-section">
                                <div className="image-detail__image-data-wrap">
                                    <div className="image-detail__image-data">
                                        <div>Uploaded on: <span className="image-detail__image-data-result">{created_at}</span></div>
                                        <div>Uploaded by: <span className="image-detail__image-data-result">{author}</span></div>
                                        <div>File name: <span className="image-detail__image-data-result">{filename}</span></div>
                                        <div>File type: <span className="image-detail__image-data-result">{media_type}</span></div>
                                        <div>File size: <span className="image-detail__image-data-result">7 KB</span></div>
                                        <div>Dimensions: <span className="image-detail__image-data-result">{height} by {width} pixels</span></div>
                                    </div>
                                </div>
                                <Form initialValues={this.state} onSubmit={save}>
                                    {props => (
                                        <form onSubmit={props.handleSubmit}>
                                            <AutoSave updateAsset={this.props.updateAsset} debounce={1000} save={save} />
                                            <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Alternative Text</span><Field
                                                name="alternate_text"
                                                label="Alt"
                                                component="input"
                                                type="text"
                                                className="image-detail__input"
                                            /></div>
                                            <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Title</span><Field
                                                name="title"
                                                label="Title"
                                                component="input"
                                                type="text"
                                                className="image-detail__input"
                                            /></div>
                                            <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Caption</span><Field
                                                name="caption"
                                                label="Caption"
                                                component="textarea"
                                                type="text"
                                                className="image-detail__textarea"
                                            /></div>
                                            <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Description</span><Field
                                                name="description"
                                                label="Description"
                                                component="textarea"
                                                type="text"
                                                className="image-detail__textarea"
                                            /></div>
                                            <div className="image-detail__line-to-change_uploated-by">Uploated By<span className="image-detail__name-of-changes__uploated-by">{author}</span></div>
                                            <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">File URL:</span><Field
                                                name="url"
                                                label="File URL"
                                                component="input"
                                                type="text"
                                                className="image-detail__input"
                                            /></div>
                                            <div><CopyToClipboard text={props.values.url}><button className="image-detail__btn image-detail__btn-copy-url">Copy URL to clipboard</button></CopyToClipboard></div>
                                            <div className="image-detail__btn-delete-wrap"><button onClick={() => this.deleteAsset(props.values.id)} className="image-detail__btn-delete">Delete permanently</button></div>
                                        </form >
                                    )
                                    }
                                </Form>
                            </div >
                        </div >
                    </div >
            </div>
        )
    }
}