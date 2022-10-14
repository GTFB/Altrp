import React, {Component} from "react";
import Chevron from "../../../../../../../../../editor/src/svgs/chevron.svg";
import {iconsManager} from "../../../../../../../../../editor/src/js/helpers";
import { setUpdatedNode } from "../../../../../../store/customizer-settings/actions";
import store from "../../../../../../store/store";


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
          }
          return item;
        });
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
        "data": {}
      };
    }


    render(){
      let block = [];
      if (_.isArray(this.props.content)) block = this.props.content;
      else this.onNotice();
      const typeOptions = [
        {label:'text', value: 'content'},
        {label:'link', value: 'link'},
        {label:'button', value: 'button'},
        {label:'file', value: 'file'},
        {label:'document', value: 'document'},
        {label:'video', value: 'video'},
        {label:'animation', value: 'animation'},
        // {label:'location', value: 'location'},
      ];

      return <div className="settings-section-box">
            <div className={"settings-section " + (this.props.activeSection === "telegram" ? '' : 'open')}>
                <div className="settings-section__title d-flex" onClick={() => this.props.toggleChevron("telegram")}>
                    <div className="settings-section__icon d-flex">
                        <Chevron />
                    </div>
                    <div className="settings-section__label"> Settings Telegram</div>
                </div>

                <div className="controllers-wrapper" style={{padding: '0 10px 20px 10px'}}>
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
                              {iconsManager().renderIcon('times')}
                            </button>
                          </div>
                          <div className="repeater-item-content">
                            <div className="controller-container controller-container_select">
                              <div className="controller-container__label control-select__label controller-label" >Type</div>
                              <div className="control-container_select-wrapper controller-field">
                                <select className="control-select control-field"
                                        value={item.type || ''}
                                        onChange={e => {this.changeSelect(e, "type", item.id)}}
                                >
                                  <option disabled value="" />
                                  {typeOptions.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
                                </select>
                              </div>
                            </div>
                            {item.type && <div className="controller-container controller-container_textarea">
                              <div className="controller-container__label textcontroller-responsive controller-label">
                                {this.getLabel(item.type)}
                              </div>
                              <div className='controller-field'>
                                <textarea className="control-field" type="text" id={`telegram_text_${item.id}`} name="text"
                                       value={item?.data?.text ?? ''} onChange={(e) => {
                                  this.changeInput(e, "text", item.id)
                                }}/>
                              </div>
                            </div>}
                            {(item.type !== "content" && item.type != '') && <div className="controller-container controller-container_textarea">
                              <div className="controller-container__label textcontroller-responsive controller-label">
                                URL
                              </div>
                              <div className='controller-field'>
                                <textarea className="control-field" type="url" id={`telegram_url_${item.id}`} name="url"
                                       value={item?.data?.url ?? ''} onChange={(e) => {
                                  this.changeInput(e, "url", item.id)
                                }}/>
                              </div>
                            </div>}
                            {(item.type == "button") && <div className="controller-container controller-container_textarea">
                              <div className="controller-container__label textcontroller-responsive controller-label">
                              Shortcode
                              </div>
                              <div className='controller-field'>
                                <textarea className="control-field" type="url" id={`telegram_url_${item.id}`} name="url"
                                       value={item?.data?.shortcode ?? ''} onChange={(e) => {
                                  this.changeInput(e, "shortcode", item.id)
                                }}/>
                              </div>
                            </div>}
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
