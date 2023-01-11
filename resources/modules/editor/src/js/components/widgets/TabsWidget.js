import TemplateLoader from "../template-loader/TemplateLoader";
import renderAssetIcon from "../../../../../front-app/src/js/functions/renderAssetIcon";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import {Tab, Tabs} from '@blueprintjs/core'

class TabsWidget extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.showTab = this.showTab.bind(this);
    this.blueprintShow = this.blueprintShow.bind(this);
    this.state = {
      settings: props.element.getSettings(),
      selected: "tab-1"
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

  blueprintShow(selected) {
    this.setState(s => ({
      ...s,
      selected
    }))
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

  /**
   * Получить css классы для tabs widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let buttonClasses = "";

    const vertical = this.props.element.getResponsiveLockedSetting("vertical", "", false);
    const animate = this.props.element.getResponsiveLockedSetting("animate");
    let classes =
      this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    let tabs = <div></div>;
    const spacing_icon_style = this.props.element.getResponsiveLockedSetting("spacing_icon_style") || {size: '10',unit:'px'};
    if (this.state.settings.items_tabs) {
      tabs = this.state.settings.items_tabs?.map((tab, idx) => {
        let iconStyles = {};
        const alignment_icon_style = this.props.element.getResponsiveLockedSetting("alignment_icon_style") || 'left'
        if (alignment_icon_style === "left") {
          iconStyles = {
            marginRight:
              spacing_icon_style?.size +
              spacing_icon_style?.unit
          };
        } else {
          iconStyles = {
            marginLeft:
              spacing_icon_style?.size +
              spacing_icon_style?.unit
          };
        }

        let icon = null;

        if (tab.icon_items) {
          if(!Array.isArray(tab.icon_items)) {
            if(tab.icon_items.url) {
              icon = (
                <div className={`${classes} altrp-tab-btn-icon`} style={iconStyles}>
                  {renderAssetIcon(tab.icon_items, {})}
                </div>
              );
            }
          }
        }
        const props = {

        }
        if(!tab.card_template){
          props. dangerouslySetInnerHTML ={
            __html:replaceContentWithData(tab.wysiwyg_items, this.props.element.getCurrentModel()),
          }
        }
        return (
          <Tab
            id={`tab-${idx + 1}`}
            className={
              `${classes} altrp-tab-btn` +
              buttonClasses +
              (this.state.selected === `tab-${idx + 1}` ? " active" : "") +
              (vertical ? " altrp-tab-vertical" : " altrp-tab-horizontal") +
              (this.state.activeTab === idx ? " active" : "")
            }
            panel={(
              <div
                {...props}
                className={`${classes} altrp-tab ${(this.state.selected === `tab-${idx + 1}` ? " active" : "")}`}>
                {tab.card_template && (
                  <TemplateLoader templateId={tab.card_template} />
                ) }
              </div>
            )}
            key={idx + 1}
          >
            {alignment_icon_style == "left" ? icon : null}
            <p>{tab.title_and_content_items}</p>
            {alignment_icon_style == "right"
              ? icon
              : null}
          </Tab>
        );
      });
    }
    return <Tabs
      onChange={this.blueprintShow}
      className={`${classes} altrp-tabs` +
        (vertical ? " altrp-tabs-vertical" : " altrp-tabs-horizontal") +
        (animate ? "" : " altrp-tabs-without-animation")
      }
      animate={animate}
      renderActiveTabPanelOnly={true}
      selectedTabId={this.state.selected}
      defaultSelectedTabId="tab-1"
      vertical={vertical}
    >
      {
        tabs
      }
    </Tabs>
  }
}

export default TabsWidget;
