import mbParseJSON from "../functions/mb-parse-JSON";

class EmailTemplatesRenderer extends window.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseEmailRender: window.baseEmailRender
    };
    this.emailTemplate = React.createRef();
    window.emailTemplatesRenderer = this;
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

export default window.reactRedux.connect(mapStateToProps)(EmailTemplatesRenderer)
