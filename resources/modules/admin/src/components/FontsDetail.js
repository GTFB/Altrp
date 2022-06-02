import ReactDOM from "react-dom";
import React from 'react';
import {Form, Field} from 'react-final-form';
import CloseModal from '../svgs/clear_black.svg';
import ArrowImageDet from '../svgs/arrowImageDet.svg';
import AutoSave from './AutoSaveDocumentDetail';
import {createGlobalStyle} from "styled-components";
import {CopyToClipboard} from "react-copy-to-clipboard";
import Scrollbars from "react-custom-scrollbars";

const GlobalStyle = createGlobalStyle`
  #admin {
    overflow: hidden;
  }
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const save = async values => {
  await sleep(1000)
}

export class FontsDetail extends React.Component {
  state = {}

  componentDidUpdate(prevProps) {
    if (prevProps.fontId !== this.props.fontId && this.props.fontId !== null) {
      this.props.getAsset(this.props.fontId).then(data => this.setState(data, () => {
        this.getAuthorList(this.state.author)
      }))
    }
  }

  getAuthorList = (id) => {
    this.props.getAuthorList().then(data => {
      let author = data.users.find(item => item.id === id);
      this.setState({
        authorName: author.name,
      })
    })
  }

  deleteAsset(id) {
    this.props.deleteAsset(id)
  }

  render() {
    const {authorName, created_at, filename, url, media_type} = this.state

    if (!this.props.fontId) return null;

    return (
      ReactDOM.createPortal(
        <div>
          <GlobalStyle/>
          <div onClick={this.props.closeFontDetail} className="document-detail_opacity-background"/>
          <div className="document-detail">
            <div className="document-detail_header">
              <div className="document-detail__title">Attachment details</div>
              <div className="document-detail__btn-nav-group">
                <button onClick={this.props.prevFontDetail} disabled={!this.props.havePreviousImage} className="document-detail__btn-nav">
                  <ArrowImageDet style={{transform: 'rotate(-180deg)'}} width={24} height={16}/>
                </button>

                <button onClick={this.props.nextFontDetail} disabled={!this.props.haveNextImage} className="document-detail__btn-nav">
                  <ArrowImageDet width={24} height={16} />
                </button>

                <button onClick={this.props.closeFontDetail} className="document-detail__btn-nav">
                  <CloseModal />
                </button>
              </div>
            </div>
            <div className="document-detail__content">
              <div className="document-detail__display">
                {media_type === "video" && (
                  <video preload="metadata" muted controls className="video-display">
                    <source src={url} type="video/mp4"/>
                    <source src={url} type="video/webm"/>
                  </video>
                )}
              </div>
              <div className="document-detail__editing-section">
                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                  <div className="document-detail__editing-scrolling">
                    <div className="document-detail__data-wrap">
                      <ul className="document-detail__data">
                        <li>Uploaded on: <span className="document-detail__data-result">{created_at}</span></li>
                        <li>Uploaded by: <span className="document-detail__data-result">{authorName}</span></li>
                        <li>File name: <span className="document-detail__data-result">{filename}</span></li>
                        <li>File type: <span className="document-detail__data-result">{media_type}</span></li>
                        <li>File size: <span className="document-detail__data-result">7 KB</span></li>
                      </ul>
                    </div>
                    <Form initialValues={this.state} onSubmit={save}>
                      {props => (
                        <form onSubmit={props.handleSubmit}>
                          <AutoSave updateAsset={this.props.updateAsset} debounce={1000} save={save}/>
                          <div className="document-detail__line-to-change">
                            <span className="document-detail__name-of-changes">Font Family</span>
                            <Field
                              name="font_family"
                              component="input"
                              type="text"
                              className="document-detail__input"
                            />
                          </div>
                          <div className="document-detail__line-to-change">
                            <span className="document-detail__name-of-changes">Font Name</span>
                            <Field
                              name="font_name"
                              component="input"
                              type="text"
                              className="document-detail__input"
                            />
                          </div>

                          <div className="document-detail__line-to-change">
                            <span className="document-detail__name-of-changes">File URL:</span>
                            <Field
                              name="url"
                              label="File URL"
                              component="input"
                              type="text"
                              className="document-detail__input"
                            />
                          </div>
                          <div className="document-detail__copy-block">
                            <CopyToClipboard text={props.values.url}>
                              <button className="document-detail__btn document-detail__btn-copy-url">
                                Copy URL to clipboard
                              </button>
                            </CopyToClipboard>
                          </div>
                          <div className="document-detail__btn-delete-wrap">
                            <button onClick={() => this.deleteAsset(props.values.id)}
                                    className="document-detail__btn-delete">Delete permanently
                            </button>
                          </div>
                        </form>
                      )}
                    </Form>
                  </div>
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    )
  }
}
