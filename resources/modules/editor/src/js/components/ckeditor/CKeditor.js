import React, { Component } from "react";
import Alignments from '../../../../../altrp-reports/src/components/painter/widgets/Alignments';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

class CKeditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.textWidget) {
      return (<>
        <CKEditor
          editor={BalloonEditor}
          disabled={!this.props.readOnly}
          data={this.props.text || 'Type text here'}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => this.props.changeText(editor.getData())}
        />
      </>);
    }
    return <CKEditor
      editor={BalloonEditor}
      data={this.props.text || 'Type text here'}
      disabled={this.props.readOnly}
      onReady={editor => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
    />
  }
}

export default CKeditor;