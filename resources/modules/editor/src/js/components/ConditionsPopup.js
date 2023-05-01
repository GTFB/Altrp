import React, {useEffect, useState} from "react";
import axios from "axios";
import {getEditor, getTemplateId} from "../helpers";
import {iconsManager} from "../../../../front-app/src/js/helpers";
import "./../../sass/EditorWindowPopup.scss";
import {MenuItem, Button, Alignment} from "@blueprintjs/core";
import {MultiSelect, Select} from "@blueprintjs/select";
import Delete from "./../../svgs/clear_black.svg";


const logic_options = [
  { name: "logic_type", value: "include", label: "Include" },
  { name: "logic_type", value: "exclude", label: "Exclude" }
];

const main_options = [
  { name: "type", value: "all_site", label: "All Site" },
  { name: "type", value: "page", label: "Page" },
];

function ConditionsPopup() {
  const [state, setState] = useState({
    value: [],
    currentLogic: "include",
    searchValue: "",
    pageOptions: [],
  })


  useEffect(() => {
    let abortController = new AbortController();

    const getConditions = async () => {
      let conditions = await axios.get(`/admin/ajax/templates/${getTemplateId()}/conditions`, {signal: abortController.signal});
      let pageOptions = await axios.get("/admin/ajax/pages_options?with_id=1", {
        signal: abortController.signal
      });
      console.log(pageOptions)
      console.log(conditions)
      setState(state => ({
        ...state,
        value: conditions.data.data || [],
        pageOptions: pageOptions.data,
      }))
    }
    getConditions()

    return () => {
      abortController.abort();
    }
  }, [])

  const updateConditions = async () => {
    let data = {
      data: state.value
    }
    await axios.put(`/admin/ajax/templates/${getTemplateId()}/conditions`, data)
    getEditor().toggleModalWindow();
  }

  const ItemPredicate = (query, value) => {
    return (
      `${value.label.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  const handleChangeConditionType = (currentValue, conditionId) => {
    let value = _.cloneDeep(state.value);
    value.forEach(v => {
      if (v.id === conditionId) {
        v.condition_type = currentValue;
      }
    });
    setState(state => ({
      ...state,
      value
    }))
  }

  const handleObjectTypeChange = (currentValue, conditionId) => {
    let value = _.cloneDeep(state.value);
    value.forEach(v => {
      if (v.id === conditionId) {
        v.object_type = currentValue;
        v.object_ids = [];
      }
    });
    setState(state => ({
      ...state,
      value
    }))
  }

  const removeCondition = (id) => {
    let filteredData = state.value.filter(data => data.id !== id);
    setState(state => ({
      ...state,
      value: filteredData
    }))
  }

  const addCondition = () => {
    let randomNumber = Math.floor(1 + Math.random() * (1000 - 1));
    let value = _.cloneDeep(state.value);
    value.push({
      object_type: "all_site",
      object_ids: [],
      id: randomNumber,
      condition_type: "include"
    });
    setState(state => ({
      ...state,
      value
    }))
  }

  const tagRenderer = (item) => {
    return item.label;
  }

  const isItemSelected = (item, conditionId) => {
    let value = _.cloneDeep(state.value);
    let valueFind = value.find(v => v.id === conditionId)
    return valueFind.object_ids.includes(item.value)
  }

  const handleItemSelect = (current, conditionId) => {
    let value = _.cloneDeep(state.value);
    value.forEach(v => {
      if (v.id === conditionId) {
        v.object_ids = [...v.object_ids, current]
      }
      v.object_ids = _.uniq(v.object_ids)
    });
    setState(state => ({
      ...state,
      value
    }))
  }

  const handleTagRemove = (item, conditionId, test) => {

    let removeTag = {}
    if (test === 'page') {
      removeTag = state.pageOptions.find(tag => tag.label === item)
    } else {
      removeTag = state.reportsOptions.find(tag => tag.label === item)
    }
    let value = _.cloneDeep(state.value);
    value.forEach(v => {
      if (v.id === conditionId) {
        v.object_ids = [...v.object_ids].filter(obj => obj !== removeTag.value);
      }
    });
    setState(state => ({
      ...state,
      value
    }))
  }

  return (
    <div className="condition-popup">
      <div className="condition-popup__block">
        <div className="condition-popup__top">
          <div className="condition-popup__image">
            {iconsManager().renderIcon("conditions_tab")}
          </div>
          <h2 className="condition-popup__title">Where Do You Want to Display Your Template?</h2>
          <p className="condition-popup__text">
            Set the conditions that determine where your Template is used throughout your site.
            <br/>
            For example, choose 'Entire Site' to display the template across your
            site.
          </p>
          <div className={state.value.length >= 8 ? "condition-popup__fields-wrapper scroll-wrapper-edit" : "condition-popup__fields-wrapper"}>
            {state.value.map(test => {
              return (
                <div className="condition-popup__fields-child" key={test.id}>
                  <div className="condition-popup__select condition-popup__select-v1">
                    <Select items={logic_options}
                            matchTargetWidth={true}
                            itemPredicate={ItemPredicate}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            itemRenderer={(item, {handleClick}) => {
                              return <MenuItem
                                text={item.label}
                                key={item.value}
                                active={item.value === test.condition_type }
                                onClick={handleClick}
                              />
                            }}
                            onItemSelect={current => {
                              handleChangeConditionType(current.value, test.id)
                            }}
                            fill={true}
                    >
                      <Button fill
                              alignText={Alignment.LEFT}
                              text={logic_options.find(item => ( item.value === test.condition_type))?.label}
                              rightIcon="caret-down"
                      />
                    </Select>
                  </div>
                  <div className="condition-popup__select condition-popup__select-v2">
                    <Select items={main_options}
                            matchTargetWidth={true}
                            itemPredicate={ItemPredicate}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            itemRenderer={(item, {handleClick}) => {
                              return <MenuItem
                                text={item.label}
                                key={item.value}
                                active={item.value === test.object_type }
                                onClick={handleClick}
                              />
                            }}
                            onItemSelect={current => {
                              handleObjectTypeChange(current.value, test.id)
                            }}
                            fill={true}
                    >
                      <Button fill
                              alignText={Alignment.LEFT}
                              text={main_options.find(item => ( item.value === test.object_type))?.label}
                              rightIcon="caret-down"
                      />
                    </Select>
                  </div>
                  {test.object_type === 'page' && (
                    <div className="condition-popup__multi-select">
                      <MultiSelect tagRenderer={tagRenderer} id="editor-pages"
                                   items={state.pageOptions}
                                   itemPredicate={ItemPredicate}
                                   noResults={<MenuItem disabled={true} text="No results."/>}
                                   fill={true}
                                   placeholder="Choose Pages"
                                   selectedItems={state.pageOptions.filter(p => test.object_ids.includes(p.value))}
                                   onItemSelect={current => {
                                     handleItemSelect(current.value, test.id)
                                   }}
                                   itemRenderer={(item, {handleClick}) => {
                                     return (
                                       <MenuItem
                                         icon={isItemSelected(item, test.id) ? "tick" : "blank"}
                                         text={item.label}
                                         key={item.value}
                                         onClick={handleClick}
                                       />
                                     )
                                   }}
                                   tagInputProps={{
                                     onRemove: (item) => handleTagRemove(item, test.id, test.object_type),
                                     large: false,
                                   }}
                                   popoverProps={{
                                     usePortal: false
                                   }}
                      />
                    </div>
                  )}
                  {(test.object_type === 'all_site' || test.object_type === '404') && (
                    <div className="fake-block"> </div>
                  )}
                  <div className="condition-popup__remove">
                    <div onClick={() => removeCondition(test.id)} className="condition-popup__remove-btn">
                      <Delete width={17} height={17} className="condition-popup__remove-icon"/>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="condition-popup__add-condition">
            <button onClick={addCondition} className="condition-popup__add-condition-btn">
              Add condition
            </button>
          </div>
        </div>
        <div className="condition-popup__bottom">
          <button
            className="condition-popup__save"
            onClick={updateConditions}
          >
            Save & close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConditionsPopup;
