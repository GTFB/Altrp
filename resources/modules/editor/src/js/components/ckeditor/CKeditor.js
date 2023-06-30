import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import UploadAdapterPlugin from "./Plugins/UploadAdapterPlugin";
// import {ImageResizeButtons, ImageResizeEditing, ImageResizeHandles} from '@ckeditor/ckeditor5-image';
// import {ImageUploadProgress} from "@ckeditor/ckeditor5-image";

const defaultToolbar = [
  "heading",
  "undo",
  "redo",
  "bold",
  "italic",
  "blockQuote",
  "indent",
  "outdent",
  "link",
  "numberedList",
  "bulletedList",
  "imageTextAlternative",
  "imageUpload",
  "mediaEmbed",
  "insertTable",
  "tableColumn",
  "tableRow",
  "mergeTableCells"
];

class CKeditor extends Component {
  constructor(props) {
    super(props);
    this.body = window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body;

  }

  render() {
    const text = this.props.text === undefined ? "Type text here" : this.props.text

    const config = {
      placeholder: this.props.placeholder || "",
      extraPlugins: [UploadAdapterPlugin],
      body: this.body,
      toolbar: defaultToolbar,
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'code', view: {name: 'code', classes: 'ck-editor_code'}, title: 'Code', class: 'ck-heading_code' }
        ]
      }
    };

    if (this.props.textWidget) {
      return (
        <>
          <CKEditor
            config={config}
            body={this.body}
            editor={InlineEditor}
            disabled={!this.props.readOnly}
            data={text}
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              editor.plugins.get( 'TextTransformation' ).isEnabled = false;
            }}
            onChange={(event, editor) => {
              this.props.changeText(editor.getData())
            }}
          />
        </>
      );
    }

    return (
      <CKEditor
        config={config}

        body={this.body}
        ref={this.props.editorRef}
        editor={InlineEditor}
        data={text}
        disabled={this.props.readOnly}
        onReady={editor => {
          editor.plugins.get( 'TextTransformation' ).isEnabled = false;
          if(this.props.onLoad){
            this.props.onLoad(editor)
          }
        }}
        onChange={(event, editor) => {
          this.props.onChange(event, editor)
        }}
        onBlur={(event, editor) => this.props.onBlur(event, editor)}
      />
    );
  }
}

export default CKeditor;
