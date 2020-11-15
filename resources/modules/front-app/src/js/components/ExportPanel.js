import Frame3 from "../../../../editor/src/svgs/Frame 3.svg";
import Code from "../../../../editor/src/svgs/code.svg";
import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import _ from "lodash";
import CodeEditor from "./CodeEditor";
import beautify from "js-beautify";

class ExportPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditor: false
    };
    this.print = this.print.bind(this);
    this.code = this.code.bind(this);
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
      styleTag.remove();
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
    })
      .post({
        dom: html,
        reportID: this.props.reportID,
        cssRules: completeStyles
      })
      .then(
        res => {
          window.location.replace(res.path);
        },
        rej => {
          console.log(rej);
        }
      );
  }

  print() {
    window.print();
  }

  render() {
    return (
      <>
        <div className="export-panel" id="export-panel">
          <div className="col">
            <div className="row justify-content-start d-flex py-3">
              <div className="col-auto">
                <button onClick={this.code}>
                  <Code />
                </button>
              </div>
              <div className="col-auto">
                <button onClick={this.print}>
                  <Frame3 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ExportPanel;
