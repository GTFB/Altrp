import RootElement from "../elements/RootElement";
import {getEditorContent} from "../../helpers";


class Renderer {

  /**
   * @param {Editor} editor
   * */
  constructor(editor){
    this.editor = editor;
    // this.editorWindow = getEditorContent().editorWindow.current;
    // let rootElement = new RootElement();
    // editor.editorWindow.current.setState({
    //   rootElement
    // });
    // console.log(rootElement);
  }

  /**
   * @param {RootElement} rootElement
   * */
  renderRootElement(rootElement){
    this.editorWindow.setState({
      rootElement
    });
  }
}
export default Renderer;