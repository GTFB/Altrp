import ReactDOM from "react-dom";
import CloseModal from "../svgs/clear_black.svg";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {InputGroup} from "@blueprintjs/core";
import {numberExp, titleToNameTwo} from "../js/helpers";

function ImageSettingsModal(props) {
  const [state, setState] = useState({
    value: {
      name: '',
      width: '',
      height: '',
    }
  })

  useEffect(async () => {
    if (props.id) {
      let { data } = await axios.get('/admin/ajax/media_settings/' + props.id)
      setState(state => ({
        ...state,
        value: data.data
      }))
    }
  }, [])

  const submitImageSettings = async (e) => {
    e.preventDefault();
    if (props.id) {
      await axios.put('/admin/ajax/media_settings/' + props.id, state.value)
    } else {
      try {
        await axios.post('/admin/ajax/media_settings', state.value)
      } catch (error) {
        alert("Заполните поля");
        console.error(error);
      }
    }
    props.toggleModal()
    props.getImageSettings()
  }

  const changeImageSettings = (value, name) => {
    setState(state => {
      state = { ...state }
      if (name === 'name') {
        state.value[name] = titleToNameTwo(value)
      } else {
        state.value[name] = numberExp(value)
      }
      return state
    })
  }

  return (
    ReactDOM.createPortal(
      <div className={props.activeMode ? "modal-window modal-window_active" : "modal-window"} onClick={props.toggleModal}>
        <div className="modal-window-content animation-scale" onClick={(e) => e.stopPropagation()}>
          <CloseModal className="icon_modal" onClick={props.toggleModal} />
          <div className="image-settings__block">
            <form className="image-settings__form" onSubmit={submitImageSettings}>
              <div className="form-group">
                <label htmlFor="image-settings-name" className="label__RobotoFont">Name settings image:</label>
                <InputGroup className="form-control-blueprint"
                            type="text"
                            value={state.value.name}
                            onChange={e => {
                              changeImageSettings(e.target.value, 'name')
                            }}
                />
              </div>
              <div className="form-group__inline-wrapper">
                <div className="form-group form-group_width47">
                  <label htmlFor="image-settings-width" className="label__RobotoFont">Width:</label>
                  <InputGroup className="form-control-blueprint"
                              type="text"
                              value={state.value.width}
                              onChange={e => {
                                changeImageSettings(e.target.value, "width")
                              }}
                              // maxLength={4}
                  />
                </div>
                <div className="form-group form-group_width47">
                  <label htmlFor="image-settings-height" className="label__RobotoFont">Height:</label>
                  <InputGroup className="form-control-blueprint"
                              type="text"
                              value={state.value.height}
                              onChange={e => {
                                changeImageSettings(e.target.value, "height")
                              }}
                              // maxLength={4}
                  />
                </div>
              </div>
              <button className="btn btn_success" type="submit">{props.id ? 'Save' : 'Add'}</button>
            </form>
          </div>
        </div>
      </div>,
      document.body
    )
  )
}

export default ImageSettingsModal;
