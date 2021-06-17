import { Component } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-solarized_dark";
import beautify from "js-beautify";
import Resource from "../../../../editor/src/js/classes/Resource";

class CodeEditor extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Форматируем специальные символы для корректного отображения
   * @param code
   */
  formatting(code) {
    let result = beautify.html(code, {
      indent_size: "4",
      indent_char: " ",
      max_preserve_newlines: "5",
      preserve_newlines: true,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: "normal",
      brace_style: "collapse",
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: "0",
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false
    });
    return result;
  }

  code() {
    let documentVar = document.cloneNode(true);
    let exportPanel = documentVar.getElementById("export-panel");
    /**
     * Удаляем панель перед отправкой
     */
    exportPanel.remove();

    documentVar.getElementById("ace-solarized-dark").remove();
    documentVar.getElementById("ace-tm").remove();
    documentVar.getElementById("ace_editor.css").remove();
    // documentVar.getElementById("styles-container").remove();
    /**
     * Собираем информацию по тэгам style
     */
    let styleTags = documentVar.getElementsByTagName("style");
    let completeStyles = "";
    for (let styleTag of styleTags) {
      if (styleTag.hasAttribute("data-styles-id")) {
        completeStyles += styleTag.innerText;
      }
      if (styleTag.hasAttribute("type")) {
        completeStyles += styleTag.innerText;
      }
      styleTag.remove();
    }
    documentVar.getElementById("styles-container").remove();
    for (let element of documentVar.querySelectorAll("[id]")) {
      if (element.hasAttribute("id") && element.getAttribute("id") == "") {
        element.removeAttribute("id");
      }
      if (
        element.hasAttribute("id") &&
        element.getAttribute("id") == "columnCount"
      ) {
        element.removeAttribute("id");
      }
    }
    /**
     * Выставляем абсолютные пути на картинки
     */
    var imgs = documentVar.getElementsByTagName("img");
    for (let img of imgs) {
      img.src = img.src.toString();
    }
    const html = this.formatting(documentVar.documentElement.innerHTML);
    new Resource({
      route: "/reports/generate"
    }).post({
      dom: html,
      reportID: this.props.reportID,
      cssRules: completeStyles
    });
    return html;
  }

  render() {
    const html = this.code();
    return (
      <div
        id="code-window"
        style={{
          position: "absolute",
          background: "white",
          border: "2px solid lightgray",
          borderRadius: "4px",
          width: "950px",
          height: "600px",
          padding: "10px",
          transform: "translate(50%,50%)",
          zIndex: 9999999
        }}
      >
        <AceEditor
          mode="html"
          theme="solarized_dark"
          fontSize={16}
          height={"100%"}
          width={"100%"}
          name="UNIQUE_ID_OF_DIV"
          value={html}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </div>
    );
  }
}

export default CodeEditor;
