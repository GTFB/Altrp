import {
  renderAsset,
  renderAssetIcon
} from "../../../../../front-app/src/js/helpers";
import TemplateLoader from "../template-loader/TemplateLoader";

class TabsWidget extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.showTab = this.showTab.bind(this);
    this.state = {
      settings: props.element.getSettings(),
      activeTab: 0
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  show(e) {
    let button = e.currentTarget;
    let collectionTabs = button.parentNode.parentNode.getElementsByClassName(
      "altrp-tab-content"
    )[0];
    let currentTab = collectionTabs.children[button.dataset.key];

    for (let i = 0; i < collectionTabs.children.length; i++) {
      collectionTabs.children[i].classList.remove("altrp-tab-show");
      e.currentTarget.parentNode.children[i].classList.remove("active");
    }
    currentTab.classList.add("altrp-tab-show");
    // e.currentTarget.classList.add("active");
    this.setState(state => ({
      ...state,
      activeTab: Number(button.dataset.key) || 0
    }));
  }

  showTab(tabKey) {
    const dataKey = tabKey;
    const button = document.querySelector(
      "[data-key=" + "'" + dataKey + "'" + "]"
    );
    let collectionTabs = button.parentNode.parentNode.getElementsByClassName(
      "altrp-tab-content"
    )[0];
    let currentTab = collectionTabs.children[button.dataset.key];

    for (let i = 0; i < collectionTabs.children.length; i++) {
      collectionTabs.children[i].classList.remove("altrp-tab-show");
      button.parentNode.children[i].classList.remove("active");
    }
    currentTab.classList.add("altrp-tab-show");
    this.setState(state => ({
      ...state,
      activeTab: Number(button.dataset.key) || 0
    }));
  }

  fireAction(action) {
    const regexp = /\(\s*([^)]+?)\s*\)/;
    let parameter = regexp.exec(action);
    let currentParameter = null;
    if (parameter) {
      currentParameter = parameter[1];
      action = action.replace(regexp, "");
    }

    if (typeof this[action] !== "undefined") {
      if (currentParameter !== null) {
        this[action](currentParameter);
      } else {
        this[action]();
      }
    } else {
      alert("ERROR, NOT FOUND ACTION");
    }
  }

  render() {
    let tab = null;

    if (this.state.settings.type_type == "tabs") {
      let buttonClasses = "";

      switch (this.state.settings.layout_tabs) {
        case "top":
          buttonClasses = " altrp-tab-btn-column altrp-tab-btn-top";
          break;
        case "bottom":
          buttonClasses = " altrp-tab-btn-column altrp-tab-btn-bottom";
          break;
        case "left":
          buttonClasses = " altrp-tab-btn-row altrp-tab-btn-left";
          break;
        case "right":
          buttonClasses = " altrp-tab-btn-row altrp-tab-btn-right";
          break;
      }

      let tabs = <div></div>;
      if (this.state.settings.items_tabs) {
        tabs = this.state.settings.items_tabs.map((tab, idx) => {
          let iconStyles = {};

          if (this.state.settings.alignment_icon_style === "left") {
            iconStyles = {
              paddingRight:
                this.state.settings.spacing_icon_style.size +
                this.state.settings.spacing_icon_style.unit
            };
          } else {
            iconStyles = {
              paddingLeft:
                this.state.settings.spacing_icon_style.size +
                this.state.settings.spacing_icon_style.unit
            };
          }

          let icon = null;
          if (tab.icon_items) {
            icon = (
              <div className="altrp-tab-btn-icon" style={iconStyles}>
                {renderAssetIcon(tab.icon_items, {})}
              </div>
            );
          }

          return (
            <button
              data-key={idx}
              className={
                "altrp-tab-btn" +
                buttonClasses +
                (this.state.activeTab === idx ? " active" : "")
              }
              onClick={this.show}
              key={idx}
            >
              {this.state.settings.alignment_icon_style == "left" ? icon : null}
              <p>{tab.title_and_content_items}</p>
              {this.state.settings.alignment_icon_style == "right"
                ? icon
                : null}
            </button>
          );
        });
      }

      let tabWrapper = <div></div>;
      if (this.state.settings.items_tabs) {
        tabWrapper = this.state.settings.items_tabs.map((tab, idx) => {
          let show = "";
          if (idx == 0) {
            show = "altrp-tab-show";
          }

          return (
            <div data-key={idx} className={"altrp-tab " + show} key={idx}>
              {tab.card_template ? (
                <TemplateLoader templateId={tab.card_template} />
              ) : (
                tab.wysiwyg_items
              )}
            </div>
          );
        });
      }

      let tabsStyles = "";

      if (this.state.settings.layout_tabs == "left") {
        tabsStyles = " altrp-tabs-left";
      }
      if (this.state.settings.layout_tabs == "right") {
        tabsStyles = " altrp-tabs-right";
      }
      tab = (
        <div className={"altrp-tabs" + tabsStyles}>
          {this.state.settings.layout_tabs == "top" ||
          this.state.settings.layout_tabs == "left" ? (
            <div className="altrp-tab-btn-container">{tabs}</div>
          ) : null}
          <div className="altrp-tab-content">{tabWrapper}</div>
          {this.state.settings.layout_tabs == "bottom" ||
          this.state.settings.layout_tabs == "right" ? (
            <div className="altrp-tab-btn-container">{tabs}</div>
          ) : null}
        </div>
      );
    }

    return tab;
  }
}

export default TabsWidget;
