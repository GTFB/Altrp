import React, {Component} from "react";
import Chevron from "../../../../../../../../../../editor/src/svgs/chevron.svg";
import { setUpdatedNode } from "../../../../../../../store/customizer-settings/actions";
import store from "../../../../../../../store/store";


export default class SendTelegram extends Component{
    constructor(props){
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.changeInput = this.changeInput.bind(this);

    }

    // Запись значений select в store
    changeSelect(e, key, id) {
      const node = this.props.selectNode;
      if (key === "type"){
        node.data.props.nodeData.data.content.map(item =>{
          if(item.id === id) item.type = e.target.value;
          return item;
        });
      }
      if (key === "listener"){
        node.data.props.nodeData.data.content.map(item =>{
          if(item.id === id) item.listener = e.target.value;
          return item;
        });
      }
      store.dispatch(setUpdatedNode(node));
    }

    // Запись значений input в store
    changeInput(e, key = false, id = false) {
      const node = this.props.selectNode;
      const value = e.target.value;
      if (id && key){
        node.data.props.nodeData.data.content.map(item =>{
          if(item.id === id) {
            if(key === 'name') item.name = value;
            else item.data[key] = value;
            if(key === 'listener_value') item.listener_value = value;
            else item.data[key] = value;
          }
          return item;
        });
      } else if(key) {
        node.data.props.nodeData.data[key] = value
      }
      store.dispatch(setUpdatedNode(node));
    }

    // Создание блока
    onCreate(){
      const node = this.props.selectNode;
      if(_.isArray(node.data.props.nodeData.data.content)) {
        const count = node.data.props.nodeData.data.content.length;
        node.data.props.nodeData.data.content.push(this.getNewBlock(count));
      } else {
        this.onNotice();
      }
      store.dispatch(setUpdatedNode(node));
    }

    // Удаление блока
    onDelete(item){
      const node = this.props.selectNode;
      if(_.isArray(node.data.props.nodeData.data.content)) {
        const blocks = node.data.props.nodeData.data.content;
        const newBlocks = blocks.filter(i => i.id !== item.id);
        node.data.props.nodeData.data.content = newBlocks;
      } else {
        this.onNotice();
      }
      store.dispatch(setUpdatedNode(node));
    }

    onNotice(){
      console.log("Пересоздайте ноду messageAction для правильной работы роботов");
    }

    onChange(e){
      console.log(e);
      console.log(e?.target?.value);
    }

    getLabel(type){
      let label = '';
      switch (type){
        case "link":
          label = "Text";
          break;
        case "content":
          label = "";
          break;
        default:
          label = "Label";
      }
      return label;
    }

    getNewBlock(count){
      const countNew = count + 1;
      return {
        "id": new Date().getTime(),
        "name": `Block ${countNew}`,
        "type": "",
        "listener": "text",
        "listener_value": "",
        "data": {}
      };
    }


    render(){
      let block = [];
      if (_.isArray(this.props.content)) block = this.props.content;
      else this.onNotice();
      const typeOptions = [
        {label:'Text', value: 'content'},
        {label: 'Robotizer', value: 'customizer'},
        {label:'Link', value: 'link'},
        {label:'Photo', value: 'photo'},
        {label:'File', value: 'file'},
        {label:'Document', value: 'document'},
        {label:'Video', value: 'video'},
        // {label:'animation', value: 'animation'},
        // {label:'location', value: 'location'},
      ];

      const listeners = [
        {label:'None', value: "none"},
        {label:'Text', value: 'text'},
        {label:'Photo', value: 'photo'},
        {label:'Document', value: 'document'},
        {label:'Button', value: 'button'},
      ]

      return <div className="settings-section-box">
            <div className={"settings-section " + (this.props.activeSection === "telegram" ? '' : 'open')}>
                <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("telegram")}>
                    <div className="settings-section__icon d-flex">
                        <Chevron />
                    </div>
                    <div className="settings-section__label"> Settings Telegram</div>
                </div>

                <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
                  <div className="controller-container controller-container_textarea">
                    <div className="controller-container__label textcontroller-responsive controller-label">
                      Start text
                    </div>
                    <div className='controller-field'>
                                <textarea className="control-field" id={`telegram_start_text`} name="url"
                                          value={this.props.selectNode.data.props?.nodeData?.data?.start_text ?? ''} onChange={(e) => {
                                  this.changeInput(e, "start_text")
                                }}/>
                    </div>
                  </div>
                  {/*<input*/}
                  {/*  className="control-field"*/}
                  {/*  type="text"*/}
                  {/*  id={`startText`}*/}
                  {/*  name="startText"*/}
                  {/*  style={{width: '100%'}}*/}
                  {/*  value={this.props.selectNode.data.props.nodeData.data.start_text ?? ''}*/}
                  {/*  onChange={(e) => { this.changeInput(e, 'start_text') }}*/}
                  {/*/>*/}
                  <div className="controller-container controller-container_repeater repeater">
                    <div className="control-header">
                      <div className="controller-container__label mt-10">
                        Blocks
                      </div>
                    </div>
                    <div className="repeater-fields">
                      {block.map( (item, index) =>{
                        return <div className="repeater-item repeater-item_open" key={index}>
                          <div className="repeater-item-tools">
                            <div className="repeater-item__caption">
                              <input
                                className="compare-control-field"
                                type="text"
                                id={`block_${item.id}`}
                                name="block"
                                style={{width: '100%'}}
                                value={item?.name ?? ''}
                                onChange={(e) => { this.changeInput(e, 'name', item.id) }}
                              />
                            </div>
                            <button className="repeater-item__icon" onClick={() => this.onDelete(item)}>
                              {window.iconsManager.renderIcon('times')}
                            </button>
                          </div>
                          <div className="repeater-item-content">
                            {/*<div className="controller-container controller-container_select">*/}
                            {/*  <div className="controller-container__label control-select__label controller-label" >Listener</div>*/}
                            {/*  <div className="control-container_select-wrapper controller-field">*/}
                            {/*    <select className="control-select control-field"*/}
                            {/*            value={item.listener || 'none'}*/}
                            {/*            onChange={e => {this.changeSelect(e, "listener", item.id)}}*/}
                            {/*    >*/}
                            {/*      {listeners.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}*/}
                            {/*    </select>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                            <div className="controller-container">
                              <div className="controller-container__label control-select__label controller-label" >Text</div>
                              <div className="control-container_select-wrapper controller-field">
                                <input
                                  className="control-field"
                                  type="text"
                                  id={`block_${item.id}`}
                                  name="blockListener"
                                  style={{width: '100%'}}
                                  value={item?.listener_value ?? ''}
                                  onChange={(e) => { this.changeInput(e, 'listener_value', item.id) }}
                                />
                              </div>
                            </div>
                            {/*<div className="controller-container controller-container_select">*/}
                            {/*  <div className="controller-container__label control-select__label controller-label" >Type</div>*/}
                            {/*  <div className="control-container_select-wrapper controller-field">*/}
                            {/*    <select className="control-select control-field"*/}
                            {/*            value={item.type || ''}*/}
                            {/*            onChange={e => {this.changeSelect(e, "type", item.id)}}*/}
                            {/*    >*/}
                            {/*      <option disabled value="" />*/}
                            {/*      {typeOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}*/}
                            {/*    </select>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                            {/*{item.type === "content" && <div className="controller-container controller-container_textarea">*/}
                            {/*  <div className="controller-container__label textcontroller-responsive controller-label">*/}
                            {/*    {this.getLabel(item.type)}*/}
                            {/*  </div>*/}
                            {/*  <div className='controller-field'>*/}
                            {/*    <textarea className="control-field" type="text" id={`telegram_text_${item.id}`} name="text"*/}
                            {/*           value={item?.data?.text ?? ''} onChange={(e) => {*/}
                            {/*      this.changeInput(e, "text", item.id)*/}
                            {/*    }}/>*/}
                            {/*  </div>*/}
                            {/*</div>}*/}
                            {/*{(item.type !== "content" && item.type !== "customizer" && item.type !== '') && <div className="controller-container controller-container_textarea">*/}
                            {/*  <div className="controller-container__label textcontroller-responsive controller-label">*/}
                            {/*    URL*/}
                            {/*  </div>*/}
                            {/*  <div className='controller-field'>*/}
                            {/*    <textarea className="control-field" type="url" id={`telegram_url_${item.id}`} name="url"*/}
                            {/*           value={item?.data?.url ?? ''} onChange={(e) => {*/}
                            {/*      this.changeInput(e, "url", item.id)*/}
                            {/*    }}/>*/}
                            {/*  </div>*/}
                            {/*</div>}*/}
                            {/*{(item.type === "customizer" && item.type !== '') && <div className="controller-container controller-container_textarea">*/}
                            {/*  <div className="controller-container__label textcontroller-responsive controller-label">*/}
                            {/*    Customizer*/}
                            {/*  </div>*/}
                            {/*  <div className='controller-field'>*/}
                            {/*    <select className="control-select control-field"*/}
                            {/*            value={item?.data?.customizer || ''}*/}
                            {/*            onChange={e => {this.changeInput(e, "customizer", item.id)}}*/}
                            {/*    >*/}
                            {/*      <option disabled value="" />*/}
                            {/*      {this.props.customizerOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}*/}
                            {/*    </select>*/}
                            {/*  </div>*/}
                            {/*</div>}*/}
                            {/*{(item.type == "button") && <div className="controller-container controller-container_textarea">*/}
                            {/*  <div className="controller-container__label textcontroller-responsive controller-label">*/}
                            {/*  Shortcode*/}
                            {/*  </div>*/}
                            {/*  <div className='controller-field'>*/}
                            {/*    <textarea className="control-field" type="url" id={`telegram_url_${item.id}`} name="url"*/}
                            {/*           value={item?.data?.shortcode ?? ''} onChange={(e) => {*/}
                            {/*      this.changeInput(e, "shortcode", item.id)*/}
                            {/*    }}/>*/}
                            {/*  </div>*/}
                            {/*</div>}*/}
                            {/*{(item.type === "file" || item.type === "document" || item.type === "animation"  || item.type === "video") && <div>*/}
                            {/*  <input*/}
                            {/*    type="file"*/}
                            {/*    // accept={this.state.acceptInput}*/}
                            {/*    // multiple={true}*/}
                            {/*    onChange={(e) => this.onChange(e, item)}*/}
                            {/*    className="uploader__input"/>*/}
                            {/*</div>}*/}

                            {/*<div className="controller-container controller-container_textarea">*/}
                            {/*  <div className="controller-container__label control-select__label controller-label">*/}
                            {/*    Type*/}
                            {/*  </div>*/}
                            {/*  <div className="control-group controller-field">*/}
                                {/*<input*/}
                                {/*  className="control-field"*/}
                                {/*  type="text"*/}
                                {/*  id={`operand-1_${item.id}`}*/}
                                {/*  name="operand"*/}
                                {/*  style={{width: '100%'}}*/}
                                {/*  value={item.operands[0] ?? ''}*/}
                                {/*  onChange={(e) => { this.changeInput(e, item.id, 0) }}*/}
                                {/*/>*/}
                            {/*  </div>*/}
                            {/*</div>*/}

                            {/*<div className="controller-container controller-container_textarea">*/}
                            {/*  <div className="controller-container__label control-select__label controller-label">*/}
                            {/*    Value*/}
                            {/*  </div>*/}
                            {/*  <div className="control-group controller-field">*/}
                            {/*            <textarea*/}
                            {/*              className="control-field"*/}
                            {/*              type="text"*/}
                            {/*              id={`operand-2_${item.id}`}*/}
                            {/*              name="operand"*/}
                            {/*              style={{width: '100%'}}*/}
                            {/*              value={item.operands[1] ?? ''}*/}
                            {/*              onChange={(e) => { this.changeInput(e, item.id, 1) }}*/}
                            {/*            />*/}
                            {/*  </div>*/}
                            {/*</div>*/}

                          </div>{/* ./repeater-item-content */}
                        </div>}
                      )}
                    </div>
                    <div className="d-flex justify-center repeater-bottom">
                      <button
                        className="btn font_montserrat font_500 btn_grey btn_active"
                        style={{background:'#87CA00', padding:'5px', fontSize: '10px', textTransform: 'uppercase'}}
                        onClick={() => this.onCreate()}
                      >
                        Add
                      </button>
                    </div>
                  </div>{/* ./controller-container controller-container_repeater repeater */}
                </div> {/* ./controllers-wrapper */}
            </div> {/* ./settings-section */}
        </div>
    }
}
