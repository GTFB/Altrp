import React, {Component} from 'react';
import styled from 'styled-components';
import JSONEditorPlugin from 'jsoneditor';
import 'jsoneditor/src/scss/jsoneditor.scss';

const JSONEditorContainer = styled.div`
  width: 100%;
  height: 100%;

  .jsoneditor-poweredBy {
    display: none;
  }
`;

export default class JSONEditor extends Component {
  componentDidMount () {
    const options = {
      mode: 'code',
      onChangeText: this.props.onChange
    };

    this.jsoneditor = new JSONEditorPlugin(this.container, options);
    this.jsoneditor.setText(this.props.value);
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentDidUpdate() {
    this.jsoneditor.updateText(this.props.value);
  }

  render() {
    return (
      <JSONEditorContainer ref={elem => this.container = elem} />
    );
  }
}
