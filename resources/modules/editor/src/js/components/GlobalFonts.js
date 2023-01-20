import React, { Component } from "react";
import styled from "styled-components";
import { Button, Divider, Collapse } from "@blueprintjs/core";
import { connect } from "react-redux";
import {
  addGlobalFont,
  editGlobalFont,
  deleteGlobalFont
} from "../store/altrp-global-colors/actions";
import BaseElement from "../classes/elements/BaseElement";
import GlobalFontItemAdd from "./GlobalFontItemAdd";
import GlobalFontItem from "./GlobalFontItem";
import { getTemplateDataStorage } from "../helpers";
import Scrollbars from "react-custom-scrollbars";

const Panel = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 20px 0;
`;

const mapStateToProps = state => ({
  fonts: state.globalStyles.fonts || []
});

const mapDispatchToProps = dispatch => ({
  addFont: font => dispatch(addGlobalFont(font)),
  editFont: font => dispatch(editGlobalFont(font)),
  deleteFont: font => dispatch(deleteGlobalFont(font))
});

class GlobalFonts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: false,
      fonts: props.fonts
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSaveFont = this.onSaveFont.bind(this);
    this.updateAllTree = this.updateAllTree.bind(this);
  }

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} font
   */
  recursiveWalkTree(template, guid, font) {
    if (Array.isArray(template)) {
      template?.forEach(
        /**
         * @param {BaseElement} templateItem
         */
        templateItem => {
          const hasGlobal = Boolean(templateItem.hasGlobal(guid));
          if (hasGlobal) {
            templateItem.updateAllGlobals(guid, font);
          }
          this.recursiveWalkTree(templateItem, guid, font);
        }
      );
    } else this.recursiveUpdate(template, guid, font);
  }

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} font
   */
  recursiveUpdate(template, guid, font) {
    if (template.hasGlobal(guid)) {
      template.updateAllGlobals(guid, font);
    }
    template.children?.forEach(
      /**
       * @param {BaseElement} child
       */
      child => {
        if (child.hasGlobal(guid)) {
          child.updateAllGlobals(guid, font);
        }

        child.children.length > 0 &&
          this.recursiveWalkTree(child.children, guid, font);
      }
    );
  }

  addItem() {
    this.setState(
      s => ({ new: !s.new })
    );
  }

  deleteItem(id) {
    const confirm = window.confirm("Are you shure?");
    if (confirm) {
      let effects = _.cloneDeep(this.state.effects, []);
      effects = effects.filter(item => item.id !== id);
      this.setState(
        s => ({ ...s, effects: effects }),
        () => this.props.setEffect(effects)
      );
      this.globalStyleResource.delete(id);
    }
  }
  /**
   * Рекурсивно обновляет эффект во всех элементах
   * @param {*} effect
   */
  updateAllTree(effect) {
    getTemplateDataStorage()
      .getRootElement()
      .children.forEach(child => {
        this.recursiveWalkTree(child, effect.guid, effect);
      });
  }

  /**
   *
   * @param {Event} e
   */
  onSaveFont() {
    this.setState(s => ({ ...s, new: false }));
  }

  render() {
    return (
      <Panel>
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <div className='panel-global__styles'>
            {this.state.new && (
              <GlobalFontItemAdd
                addFont={this.props.addFont}
                onSaveFontClose={this.onSaveFont}
                isNew={true}
              />
            )}

            {!this.state.new &&
            (this.props.fonts.length > 0 ? (
              this.props.fonts.map((item, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <GlobalFontItem
                    font={item}
                    editFont={this.props.editFont}
                    deleteFont={this.props.deleteFont}
                    onSaveFontClose={this.onSaveFont}
                    updateAllTree={this.updateAllTree}
                  />
                </div>
              ))
            ) : (
              <div className="list__empty">Font list empty</div>
            ))}

            <Button style={{ width: "100%" }} onClick={this.addItem}>
              {!this.state.new ? "➕Add Font➕" : "Cancel"}
            </Button>
          </div>
        </Scrollbars>
      </Panel>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalFonts);
