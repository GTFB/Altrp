import {connect} from "react-redux";
class AltrpCodeEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.prepareIncomingValue(this.props.value) || '',
    };

    this.editorProps = {...this.props};

    this.editorProps.theme = this.props.theme || 'textmate';
    this.editorProps.mode = this.props.mode || 'css';
    if(this.props.mode === 'wrapped json'){
      this.editorProps.mode = 'json';
    }
    // this.editorProps.onChange = this.props.onChange || this.onChange;
    this.editorProps.height = this.props.height || '15em';
    this.editorProps.enableLiveAutocompletion = _.get(this.props, 'enableLiveAutocompletion', true) ;
    this.editorProps.onChange = (value) => {
      value = this.prepareOutgoingValue(value);
      if(_.isFunction(this.props.onChange)){
        this.props.onChange(value);
      } else {
        this.onChange(value);
      }
    };
  }
  /**
   * Обработка смены значения по умолчанию
   */
  onChange = (e) =>{
    console.log(e);
  };
  componentDidUpdate(prevProps){
    if(this.props.value !== prevProps.value){

      let value = this.prepareIncomingValue(this.props.value);
      this.setState(state =>({...state, value}));
      this.editor = this.props.AceEditor ? <this.props.AceEditor
          {...this.editorProps}
          // mode="json"
          // theme="textmate"
          // onChange={this.onChange}
          //
          // name="aceEditor"
          // height="15em"
          value={value}
          // setOptions={{
          //   value: this.state.value || ''
          // }}
          // enableLiveAutocompletion={true}
      /> : ''
    }
    if(this.props.AceEditor && ! prevProps.AceEditor){
      this.setState(state =>({...state, value: this.props.value}));
    }
  }

  /**
   * обрабатвыаем значение перед отрисовкой
   */
  prepareIncomingValue(value){
    if(! value){
      return value;
    }
    if(this.props.mode === 'wrapped json'){
      if(value[0] === "'" ){
        value = value.substr(1);
      }
      if(value[value.length - 1] === "'" ){
        value = value.slice(0, -1);
      }
    }
    return value;
  }
  /**
   * обрабатвыаем значение перед отправкой
   */
  prepareOutgoingValue(value){
    if(! value){
      return value;
    }
    if(this.props.mode === 'wrapped json'){
      if(value[0] !== "'" ){
        value = `'${value}`;
      }
      if(value[value.length - 1] !== "'" ){
        value = `${value}'`;
      }
    }
    // console.log(value);
    return value;
  }
  render() {
    let {value} = this.state;
    // const editorProps = {...this.props};
    //
    // editorProps.theme = this.props.theme || 'textmate';
    // editorProps.mode = this.props.mode || 'css';
    // editorProps.onChange = this.props.onChange || this.onChange;
    // editorProps.height = this.props.height || '15em';
    // editorProps.enableLiveAutocompletion = _.get(this.props, 'enableLiveAutocompletion', true) ;
    return<div className="altrp-code-editor">
     {this.props.AceEditor && (this.editor = (this.editor ||
       <this.props.AceEditor
           {...this.editorProps}
          // mode="json"
          // theme="textmate"
          // onChange={this.onChange}
          //
          // name="aceEditor"
          // height="15em"
           value={value}
          // setOptions={{
          //   value: this.state.value || ''
          // }}
        // enableLiveAutocompletion={true}
     />))}</div>
  }
}
function mapStateToProps(state) {
  return {
    AceEditor: state.aceEditorReducer.AceEditor,
  }
}
export default connect(mapStateToProps)(AltrpCodeEditor);
