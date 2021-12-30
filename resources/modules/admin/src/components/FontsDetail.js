import React from 'react';
import { Form, Field } from 'react-final-form';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import AutoSave from './AutoSaveDocumentDetail';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  #admin {
    overflow: hidden;
  }
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const save = async values => {
    await sleep(1000)
}

export class  FontsDetail extends React.Component {
    state = {}

    componentDidUpdate(prevProps) {
        if (prevProps.fontId !== this.props.fontId && this.props.fontId !== null) {
            this.props.getAsset(this.props.fontId).then(data => this.setState(data, () => { this.getAuthorList(this.state.author) }))
        }
    }

    getAuthorList = (id) => {
        this.props.getAuthorList().then(data => {
            let author = data.find(item => item.id == id);
            this.setState({
                authorName: author.name,
            })
        })
    }

    deleteAsset(id) {
        this.props.deleteAsset(id)
    }

    render() {
        const { authorName, created_at, filename, media_type } = this.state

        if (!this.props.fontId) return null;

        return (
            <div>
                <GlobalStyle />
                <div onClick={this.props.closeFontDetail} className="document-detail_opacity-background"></div>
                <div className="document-detail">
                    <div className="document-detail_header">
                        <div className="document-detail__title">Attachment details</div>
                        <div className="document-detail__btn-nav-group">
                            {this.props.havePreviousImage
                                ? <button onClick={this.props.prevFontDetail} className="document-detail__btn-nav"><ArrowBackIosIcon fontSize="small" /></button>
                                : <button onClick={this.props.prevFontDetail} disabled className="document-detail__btn-nav"><ArrowBackIosIcon fontSize="small" /></button>}
                            {this.props.haveNextImage
                                ? <button onClick={this.props.nextFontDetail} className="document-detail__btn-nav"><ArrowForwardIosIcon fontSize="small" /></button>
                                : <button onClick={this.props.nextFontDetail} disabled className="document-detail__btn-nav"><ArrowForwardIosIcon fontSize="small" /></button>}
                            <button onClick={this.props.closeFontDetail} className="document-detail__btn-nav"><CloseIcon fontSize="small" /></button>
                        </div>
                    </div>
                    <div className="document-detail__content">
                        <div className="document-detail__display">

                        </div>
                        <div className="document-detail__editing-section">
                            <div className="document-detail__data-wrap">
                                <div className="document-detail__data">
                                    <div>Uploaded on: <span className="document-detail__data-result">{created_at}</span></div>
                                    <div>Uploaded by: <span className="document-detail__data-result">{authorName}</span></div>
                                    <div>File name: <span className="document-detail__data-result">{filename}</span></div>
                                    <div>File type: <span className="document-detail__data-result">{media_type}</span></div>
                                    <div>File size: <span className="document-detail__data-result">7 KB</span></div>
                                </div>
                            </div>
                            <Form initialValues={this.state} onSubmit={save}>
                                {props => (
                                    <form onSubmit={props.handleSubmit}>
                                        <AutoSave updateAsset={this.props.updateAsset} debounce={1000} save={save} />
                                        <div className="document-detail__line-to-change"><span className="document-detail__name-of-changes">Font Family</span><Field
                                            name="font_family"
                                            component="input"
                                            type="text"
                                            className="document-detail__input"
                                        /></div>
                                        <div className="document-detail__line-to-change"><span className="document-detail__name-of-changes">Font Name</span><Field
                                            name="font_name"
                                            component="input"
                                            type="text"
                                            className="document-detail__input"
                                        /></div>
                                        <div className="document-detail__btn-delete-wrap"><button onClick={() => this.deleteAsset(props.values.id)} className="document-detail__btn-delete">Delete permanently</button></div>
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
