import React, { Component } from "react";
import styled from "styled-components";
import { Button, Divider, Collapse } from "@blueprintjs/core";
import { connect } from "react-redux";
import {
  addGlobalEffect,
  editGlobalEffect,
  deleteGlobalEffect
} from "../store/altrp-global-colors/actions";
import BaseElement from "../classes/elements/BaseElement";
import GlobalEffectItemAdd from "./GlobalEffectItemAdd";
import GlobalEffectItem from "./GlobalEffectItem";
import { getTemplateDataStorage } from "../helpers";

const Panel = styled.div`
  background-color: #fff;
  padding: 25px 20px;
  width: 100%;
  margin: 20px 0;
  overflow: auto;
`;

const mapStateToProps = state => ({
  effects: state.globalStyles.effects || []
});

const mapDispatchToProps = dispatch => ({
  addEffect: effect => dispatch(addGlobalEffect(effect)),
  editEffect: effect => dispatch(editGlobalEffect(effect)),
  deleteEffect: effect => dispatch(deleteGlobalEffect(effect))
});

class GlobalEffects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: false,
      effects: props.effects
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSaveEffect = this.onSaveEffect.bind(this);
    this.updateAllTree = this.updateAllTree.bind(this);
  }

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} effect
   */
  recursiveWalkTree(template, guid, effect) {
    console.log(template);
    if (Array.isArray(template)) {
      template?.forEach(
        /**
         * @param {BaseElement} templateItem
         */
        templateItem => {
          const hasGlobal = Boolean(templateItem.hasGlobal(guid));
          if (hasGlobal) {
            templateItem.updateAllGlobals(guid, effect);
          }
          this.recursiveWalkTree(templateItem, guid, effect);
        }
      );
    } else this.recursiveUpdate(template, guid, effect);
  }

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} effect
   */
  recursiveUpdate(template, guid, effect) {
    if (template.hasGlobal(guid)) {
      template.updateAllGlobals(guid, effect);
    }
    template.children?.forEach(
      /**
       * @param {BaseElement} child
       */
      child => {
        if (child.hasGlobal(guid)) {
          child.updateAllGlobals(guid, effect);
        }

        child.children.length > 0 &&
          this.recursiveWalkTree(child.children, guid, effect);
      }
    );
  }

  addItem(e) {
    this.setState(s => ({ new: !s.new }));
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
  onSaveEffect() {
    this.setState(s => ({ ...s, new: false }));
  }

  render() {
    return (
      <Panel>
        <Collapse isOpen={this.state.new}>
          <GlobalEffectItemAdd
            addEffect={this.props.addEffect}
            onSaveEffectClose={this.onSaveEffect}
            isNew={true}
          />
        </Collapse>
        {!this.state.new && this.props.effects.length > 0 ? (
          this.props.effects.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <GlobalEffectItem
                effect={item}
                editEffect={this.props.editEffect}
                deleteEffect={this.props.deleteEffect}
                onSaveEffectClose={this.onSaveEffect}
                updateAllTree={this.updateAllTree}
              />
            </div>
          ))
        ) : (
          <div>Effects list empty</div>
        )}
        <Divider></Divider>
        <Button style={{ width: "100%" }} onClick={this.addItem}>
          {!this.state.new ? "Add Item" : "Cancel"}
        </Button>
      </Panel>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalEffects);
