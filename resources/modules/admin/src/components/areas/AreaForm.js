import React, {Component} from "react";
import AltrpCodeEditor from "../altrp-editor/AltrpCodeEditor";
import {titleToName} from "../../js/helpers";
import {InputGroup, MenuItem, Button, Alignment} from "@blueprintjs/core";
import {MultiSelect, Select} from "@blueprintjs/select";

const AreaTypeOptions = ['sidebar']
const SidebarTypeOptions = [
  {
    value: '',
    label: 'Choose...'
  },
  {
    value: 'content_sidebar',
    label: 'Content Sidebar'
  },
  {
    value: 'app_sidebar',
    label: 'App Sidebar'
  }
]

const SidebarLocationOption = [
  {
    value: '',
    label: 'Choose...'
  },
  {
    value: 'left',
    label: 'Left'
  },
  {
    value: 'right',
    label: 'Right'
  }
]

class AreaForm extends Component {
  constructor(props) {
    super(props);
    let defaultValue = {
      title: '',
      name: '',
      _categories: [],
      categories: [],
      settings: {
        area_type: 'sidebar',
        sidebar_type: '',
        sidebar_location: '',
        sidebar_width: '',
        custom_css: '',
        sidebar_checked: false,
      },
    };
    this.state = {
      value: props.value ? props.value : defaultValue,
    };
  }

  ItemPredicate = (query, value) => {

    if(!query) {
      return true
    }
    if (value.label) {
      const index = _.findIndex(_.split(value.label, ""), char => {
        let similar = false;
        _.split(query, "").forEach(queryChar => {
          if(queryChar === char) {
            similar = true
          }
        });
        return similar
      });

      if(index !== -1) {
        return true
      } else {
        return false
      }
    } else {
      const index = _.findIndex(_.split(value, ""), char => {
        let similar = false;
        _.split(query, "").forEach(queryChar => {
          if(queryChar === char) {
            similar = true
          }
        });
        return similar
      });

      if(index !== -1) {
        return true
      } else {
        return false
      }
    }
  }

  tagRenderer = (item) => {
    return item.label;
  };

  onQueryChange = (query, value) => {
    return (
      `${value.label.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  isItemSelectedCategory = (item) => {
    return this.state.value.categories.some(c=>c.value === item.value);
  }

  handleItemSelectCategory = (item) => {
    if (!this.isItemSelectedCategory(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          _categories: [...state.value._categories, item],
          categories: [...state.value.categories, item]
        }
      }));
    }
  }

  handleTagRemoveCategory = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        _categories: [...state.value._categories].filter((i) => i.label !== item),
        categories: [...state.value.categories].filter((i) => i.label !== item)
      },
    }));
  }

  /**
   * передадим значение
   */
  submitForm = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  }

  /**
   * Обновим значение
   * @param {*} inputValue
   * @param {string} valueName
   */
  changeValue = (inputValue, valueName) => {
    const value = {...this.state.value};
    if (valueName === 'title') {
      value.name = titleToName(inputValue);
    }
    _.set(value, valueName, inputValue);
    this.setState(state => ({...state, value}))
  }

  render() {
    const {title, settings, name} = this.state.value;
    return <form method="post" action="/ajax/areas/add" className="form-areas__container" onSubmit={this.submitForm}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="title" className="label__RobotoFont">Title</label>
          {/*<input type="text" id="title" required*/}
          {/*       name="title"*/}
          {/*       value={title}*/}
          {/*       onChange={e => {*/}
          {/*         this.changeValue(e.target.value, 'title')*/}
          {/*       }}*/}
          {/*       className="form-control"*/}
          {/*/>*/}

          <InputGroup type="text"
                      id="title"
                      required
                      name="title"
                      value={title}
                      onChange={e => {
                        this.changeValue(e.target.value, 'title')
                      }}
                      className="form-control-blueprint"
          />
        </div>
        <div className="form-group form-group_width47">
          <label htmlFor="title" className="label__RobotoFont">Name</label>
          {/*<input type="text" id="title" required*/}
          {/*       name="title"*/}
          {/*       disabled={true}*/}
          {/*       value={name}*/}
          {/*       className="form-control"*/}
          {/*/>*/}

          <InputGroup type="text"
                      id="title"
                      required
                      disabled={true}
                      name="title"
                      value={name}
                      onChange={e => {
                        this.changeValue(e.target.value, 'title')
                      }}
                      className="form-control-blueprint"
          />
        </div>
      </div>
     <div className="form-group__inline-wrapper">

       <div className="form-group flex-grow__selectBlueprint form-group_width30">
         <label htmlFor="settings.area_type" className="label__RobotoFont">Area Type</label>
         {/*<select*/}
         {/*  id="settings.area_type"*/}
         {/*  required={true}*/}
         {/*  value={settings.area_type}*/}
         {/*  onChange={e => {*/}
         {/*    this.changeValue(e.target.value, 'settings.area_type');*/}
         {/*  }}*/}
         {/*  className="form-control"*/}
         {/*>*/}
         {/*  <option value="sidebar">Sidebar</option>*/}
         {/*</select>*/}


         <Select items={AreaTypeOptions}
                 id="settings.area_type"
                 matchTargetWidth
                 required={true}
                 itemPredicate={this.ItemPredicate}
                 noResults={<MenuItem disabled={true} text="No results." />}
                 itemRenderer={(item, {handleClick, modifiers, query}) => {
                   return <MenuItem
                     text={item}
                     key={item}
                     active={item === settings.area_type }
                     onClick={handleClick}
                   />
                 }}
                 onItemSelect={current => { this.changeValue(current, 'settings.area_type') }}
                 fill={true}
         >
           <Button fill
                   large
                   alignText={Alignment.LEFT}
                   text={settings.area_type}
                   rightIcon="caret-down"
           />
         </Select>
       </div>
       {settings.area_type === 'sidebar' &&
       <div className="form-group flex-grow__selectBlueprint form-group_width30">
         <label htmlFor="settings.sidebar_type" className="label__RobotoFont">Sidebar Type</label>
         {/*<select*/}
         {/*  id="settings.sidebar_type"*/}
         {/*  required={true}*/}
         {/*  value={settings.sidebar_type}*/}
         {/*  onChange={e => {*/}
         {/*    this.changeValue(e.target.value, 'settings.sidebar_type');*/}
         {/*  }}*/}
         {/*  className="form-control"*/}
         {/*>*/}
         {/*  <option value="">Choose...</option>*/}
         {/*  <option value="content_sidebar">Content Sidebar</option>*/}
         {/*  <option value="app_sidebar">App Sidebar</option>*/}
         {/*</select>*/}

         <Select items={SidebarTypeOptions}
                 id="settings.sidebar_type"
                 matchTargetWidth
                 required={true}
                 itemPredicate={this.ItemPredicate}
                 noResults={<MenuItem disabled={true} text="No results." />}
                 itemRenderer={(item, {handleClick, modifiers, query}) => {
                   return <MenuItem
                     text={item.label}
                     key={item.value}
                     active={item.value === settings.sidebar_type }
                     onClick={handleClick}
                   />
                 }}
                 onItemSelect={current => { this.changeValue(current.value, 'settings.sidebar_type') }}
                 fill={true}
         >
           <Button fill
                   large
                   alignText={Alignment.LEFT}
                   text={SidebarTypeOptions.find(item => (item.value === settings.sidebar_type))?.label }
                   rightIcon="caret-down"
           />
         </Select>
       </div>}
       {settings.area_type === 'sidebar' &&
       <div className="form-group flex-grow__selectBlueprint form-group_width30">
         <label htmlFor="settings.sidebar_location" className="label__RobotoFont">Sidebar Location</label>
         {/*<select*/}
         {/*  id="settings.sidebar_location"*/}
         {/*  required={true}*/}
         {/*  value={settings.sidebar_location}*/}
         {/*  onChange={e => {*/}
         {/*    this.changeValue(e.target.value, 'settings.sidebar_location');*/}
         {/*  }}*/}
         {/*  className="form-control"*/}
         {/*>*/}
         {/*  <option value="">Choose...</option>*/}
         {/*  <option value="left">Left</option>*/}
         {/*  <option value="right">Right</option>*/}
         {/*</select>*/}


         <Select items={SidebarLocationOption}
                 id="settings.sidebar_location"
                 matchTargetWidth
                 required={true}
                 itemPredicate={this.ItemPredicate}
                 noResults={<MenuItem disabled={true} text="No results." />}
                 itemRenderer={(item, {handleClick, modifiers, query}) => {
                   return <MenuItem
                     text={item.label}
                     key={item.value}
                     active={item.value === settings.sidebar_location }
                     onClick={handleClick}
                   />
                 }}
                 onItemSelect={current => { this.changeValue(current.value, 'settings.sidebar_location') }}
                 fill={true}
         >
           <Button fill
                   large
                   alignText={Alignment.LEFT}
                   text={SidebarLocationOption.find(item => (item.value === settings.sidebar_location))?.label }
                   rightIcon="caret-down"
           />
         </Select>
       </div>}

     </div>
      {settings.area_type === 'sidebar' &&
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="settings.sidebar_width" className="label__RobotoFont">Sidebar Width</label>
          {/*<input type="text" id="settings.sidebar_width" required*/}
          {/*       name="settings.sidebar_width"*/}
          {/*       value={settings.sidebar_width}*/}
          {/*       onChange={e => {*/}
          {/*         this.changeValue(e.target.value, 'settings.sidebar_width')*/}
          {/*       }}*/}
          {/*       className="form-control"*/}
          {/*/>*/}

          <InputGroup type="text"
                      id="settings.sidebar_width"
                      required
                      name="settings.sidebar_width"
                      value={settings.sidebar_width}
                      onChange={e => {
                        this.changeValue(e.target.value, 'settings.sidebar_width')
                      }}
                      className="form-control-blueprint"
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="settings.sidebar_fixed" className="label__RobotoFont">Sidebar Fixed</label>
          <br/>
          <input type="checkbox" id="settings.sidebar_fixed"
                 name="settings.sidebar_fixed"
                 checked={settings.sidebar_fixed}
                 onChange={e => {
                   console.log(e.target.checked);
                   this.changeValue(e.target.checked, 'settings.sidebar_fixed')
                 }}
          />
        </div>
      </div>
      }
      <div className="form-group  form-group__multiSelectBlueprint-bp3 multiSelectBlueprint-area">
        <label htmlFor="area-categories" className="label__RobotoFont">Categories</label>
        <MultiSelect tagRenderer={this.tagRenderer} id="categories"
                     items={this.props.categoryOptions}
                     itemPredicate={this.onQueryChange}
                     noResults={<MenuItem disabled={true} text="No results."/>}
                     fill={true}
                     placeholder="Categories..."
                     selectedItems={this.state.value.categories}
                     onItemSelect={this.handleItemSelectCategory}
                     itemRenderer={(item, {handleClick, modifiers, query}) => {
                       return (
                         <MenuItem
                           icon={this.isItemSelectedCategory(item) ? "tick" : "blank"}
                           text={item.label}
                           key={item.value}
                           onClick={handleClick}
                         />
                       )
                     }}
                     tagInputProps={{
                       onRemove: this.handleTagRemoveCategory,
                       large: false,
                     }}
                     popoverProps={{
                       usePortal: false
                     }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="settings.custom_css"  className="label__RobotoFont">Custom CSS</label>
        <AltrpCodeEditor value={settings.custom_css}
                         id="settings.custom_css"
                         mode="css"
                         height="35em"
                         style={{
                           width: '100%'
                         }}
                         onChange={value => {
                           this.changeValue(value, 'settings.custom_css')
                         }}
        />
      </div>
      <button className="btn btn_success">{this.props.submitText || 'Add'}</button>
    </form>
  }
}

export default AreaForm
