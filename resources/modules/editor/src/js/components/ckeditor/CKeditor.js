import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import UploadAdapterPlugin from "./Plugins/UploadAdapterPlugin";

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
    const text = this.props.text == undefined ? "Type text here" : this.props.text

    const config = {
      extraPlugins: [UploadAdapterPlugin],
      body: this.body,
      toolbar: defaultToolbar
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
            onChange={(event, editor) =>
              this.props.changeText(editor.getData())
            }
          />
        </>
      );
    }
    return (
      <CKEditor
        config={config}
        body={this.body}
        editor={InlineEditor}
        data={text}
        disabled={this.props.readOnly}
        onReady={editor => {
          editor.plugins.get( 'TextTransformation' ).isEnabled = false;

        }}
        onChange={(event, editor) => this.props.onChange(event, editor)}
        onBlur={(event, editor) => this.props.onBlur(event, editor)}
      />
    );
  }
}

export default CKeditor;
