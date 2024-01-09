import React, { Component } from "react";
import styled from "styled-components";
import { Button, Divider, Collapse } from "@blueprintjs/core";
import { connect } from "react-redux";
import {
  addGlobalSize,
  editGlobalSize,
  deleteGlobalSize
} from "../store/altrp-global-colors/actions";
import GlobalSizeItemAdd from "./GlobalSizeItemAdd";
import GlobalSizeItem from "./GlobalSizeItem";
import { getTemplateDataStorage } from "../helpers";
import Scrollbars from "react-custom-scrollbars";
import DesignCategorySelect from "./DesignCategorySelect";

const Panel = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 20px 0;
`;

const mapStateToProps = state => {
  return ({
    sizes: state.globalStyles.sizes || [],
    colors: state.globalStyles.colors || [],
    currentCategory: state.currentCategory,
    currentScreen:state.currentScreen,
  });
}

const mapDispatchToProps = dispatch => ({
  addSize: size => dispatch(addGlobalSize(size)),
  editSize: size => dispatch(editGlobalSize(size)),
  deleteSize: size => dispatch(deleteGlobalSize(size))
});

class GlobalSizes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: false,
      sizes: props.sizes
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSaveSize = this.onSaveSize.bind(this);
    this.updateAllTree = this.updateAllTree.bind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    if (
      !_.isEqual(
        JSON.stringify(prevProps.colors),
        JSON.stringify(this.props.colors)
      )
    ) {

    }
  }

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} size
   */
  recursiveWalkTree(template, guid, size) {

    if (Array.isArray(template)) {
      template?.forEach(
        /**
         * @param {BaseElement} templateItem
         */
        templateItem => {
          const hasGlobal = Boolean(templateItem.hasGlobal(guid));
          if (hasGlobal) {
            templateItem.updateAllGlobals(guid, size);
          }
          this.recursiveWalkTree(templateItem, guid, size);
        }
      );
    } else this.recursiveUpdate(template, guid, size);
  }

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} size
   */
  recursiveUpdate(template, guid, size) {
    if (template.hasGlobal(guid)) {
      template.updateAllGlobals(guid, size);
    }
    template.children?.forEach(
      /**
       * @param {BaseElement} child
       */
      child => {
        if (child.hasGlobal(guid)) {
          child.updateAllGlobals(guid, size);
        }

        child.children.length > 0 &&
          this.recursiveWalkTree(child.children, guid, size);
      }
    );
  }

  addItem(e) {
    this.setState(s => ({ new: !s.new }));
  }

  deleteItem(id) {
    const confirm = window.confirm("Are you shure?");
    if (confirm) {
      let sizes = _.cloneDeep(this.state.sizes, []);
      sizes = sizes.filter(item => item.id !== id);
      this.setState(
        s => ({ ...s, sizes: sizes }),
        () => this.props.setSize(sizes)
      );
      this.globalStyleResource.delete(id);
    }
  }
  /**
   * Рекурсивно обновляет эффект во всех элементах
   * @param {*} size
   */
  updateAllTree(size) {
    getTemplateDataStorage()
      .getRootElement()
      .children.forEach(child => {
        this.recursiveWalkTree(child, size.guid, size);
      });
  }

  /**
   *
   * @param {Event} e
   */
  onSaveSize() {
    this.setState(s => ({ ...s, new: false }));
  }

  render() {


    let{
    } = this.state

    let {
      sizes,
      currentCategory,
    } = this.props

    console.log(currentCategory)
    console.log(sizes)

    if(! currentCategory?.value){
      sizes = sizes.filter(c=> {
        return ! c.category_guid
      })
    } else {
      sizes = sizes.filter(c=> {
        return c.category_guid === currentCategory.value
      })
    }


    return (
      <Panel>
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <div className='panel-global__styles'>
            <DesignCategorySelect/>

            {this.state.new && (
              <GlobalSizeItemAdd
                currentScreen={this.props.currentScreen}
                addSize={this.props.addSize}
                onSaveSizeClose={this.onSaveSize}
                isNew={true}
              />
            )}

            {!this.state.new &&
            (sizes.length > 0 ? (
              sizes.map((item) => (
                <div key={item.id || index} style={{ marginBottom: "10px" }}>
                  <GlobalSizeItem
                    currentScreen={this.props.currentScreen}
                    size={item}
                    editSize={this.props.editSize}
                    deleteSize={this.props.deleteSize}
                    onSaveSizeClose={this.onSaveSize}
                    updateAllTree={this.updateAllTree}
                  />
                </div>
              ))
            ) : (
              <div className="list__empty">No Spacing</div>
            ))}

            <Button style={{ width: "100%" }} onClick={this.addItem}>
              {!this.state.new ? "➕Add Spacing➕" : "Cancel"}
            </Button>
          </div>
        </Scrollbars>
      </Panel>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalSizes);
