import Frame3 from "../../../svgs/Frame 3.svg";
import Code from "../../../svgs/export.svg";
import Resource from "../../classes/Resource";
import beautify from "js-beautify";
import getRoutes from "../../../../../front-app/src/js/functions/getRoutes";

class ExportPanelWindget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePanel: props.element.getSettings().hidePanel
    };
    this.print = this.print.bind(this);
    this.code = this.code.bind(this);
    this.fireAction = this.fireAction.bind(this);
  }

  fireAction(action) {
    if (typeof this[action] !== "undefined") {
      this[action]();
    } else {
      alert("NOT FOUND ACTION");
    }
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
  /**
   * Работает только при собранном проекте (npm run front-build)
   */
  async code() {
    let documentVar = document.cloneNode(true);
    let exportPanel = documentVar.getElementById("export-panel");
    if (exportPanel !== null) {
      exportPanel.remove();
    }
    let currentRoute = window.location.pathname;
    let routes = await (await getRoutes()).default.resource.getAll();
    let currentID = _.find(routes.pages, { path: currentRoute }).id;

    if (documentVar.getElementById("ace-solarized-dark") !== null)
      documentVar.getElementById("ace-solarized-dark").remove();
    if (documentVar.getElementById("ace-tm") !== null)
      documentVar.getElementById("ace-tm").remove();
    if (documentVar.getElementById("ace_editor.css") !== null)
      documentVar.getElementById("ace_editor.css").remove();
    if (documentVar.getElementById("styles-container") !== null)
      documentVar.getElementById("styles-container").remove();

    let completeStyles = "";
    let styleTags = document.getElementsByTagName("style");

    let indexStyle = 0;
    while (styleTags.length > 0 && indexStyle < styleTags.length) {
      if (styleTags[indexStyle] !== "undefined") {
        completeStyles +=
          typeof styleTags[indexStyle] !== "undefined"
            ? styleTags[indexStyle].innerText
            : "";
        styleTags[indexStyle].parentNode.removeChild(styleTags[indexStyle]);
        indexStyle++;
      }
    }

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
        reportID: currentID,
        cssRules: completeStyles
      })
      .then(
        res => {
          if (typeof res.message !== "undefined") {
            alert("ОШИБКА");
            return;
          }
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
        {!this.state.hidePanel && (
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
        )}
      </>
    );
  }
}

export default ExportPanelWindget;
