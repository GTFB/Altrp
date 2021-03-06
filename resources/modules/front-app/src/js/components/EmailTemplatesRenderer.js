import {connect} from 'react-redux';
import React, {Component} from 'react';
import {mbParseJSON} from '../helpers';

class EmailTemplatesRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.emailTemplate = React.createRef();
    window.emailTemplatesRenderer = this;
  }

  /**
   * Нам надо загрузить baseEmailRender, для передачи рендеров компонентов для всем компонентам элементов через props
   * @return {Promise<void>}
   */
  async componentDidMount() {
    const baseEmailRender = (await import('../../../../editor/src/js/decorators/base-email-render')).baseEmailRender;
    this.setState(state => ({...state, baseEmailRender}));
  }

  /**
   *
   * @return {*}
   */
  render() {
    if (! this.props.currentEmailTemplate || ! this.state.baseEmailRender) {
      return null
    }
    let rootElement = mbParseJSON(this.props.currentEmailTemplate.data);
    rootElement = window.frontElementsFabric.parseData(rootElement);
    rootElement.templateType = 'email';
    let content = React.createElement(rootElement.componentClass, {
      element: rootElement,
      children: rootElement.children,
      baseRender: this.state.baseEmailRender,
    });
    const wrapperStyles = {
      width: '100%',
      display: 'none',
    };
    return <table id="altrp-email-renderer"
                  style={wrapperStyles}
                  ref={this.emailTemplate}>
        <tbody>
        <tr>
          <td>
            {content}
          </td>
        </tr>
        </tbody>
      </table>

  }
}

/**
 *
 * @param state
 * @return {{altrpresponses: *, formsStore: *, currentDataStorage: *, currentModel: *, currentUser: *, altrpMeta: *, altrpPageState: *, currentEmailTemplate: currentEmailTemplate}}
 */
function mapStateToProps(state) {
  return {
    altrpresponses: state.altrpresponses,
    formsStore: state.formsStore,
    currentDataStorage: state.currentDataStorage,
    currentModel: state.currentModel,
    currentUser: state.currentUser,
    altrpMeta: state.altrpMeta,
    altrpPageState: state.altrpPageState,
    currentEmailTemplate: state.currentEmailTemplate,
  };
}

export default connect(mapStateToProps)(EmailTemplatesRenderer)