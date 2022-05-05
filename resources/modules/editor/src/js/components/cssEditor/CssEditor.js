import AceEditor from "react-ace";
import {useEffect, useState} from "react";
import AltrpMeta from "../../classes/AltrpMeta";
import {useDispatch} from "react-redux";
import {setGlobalStylesCss} from "../../store/global-css-editor/actions";
import {changeTemplateStatus} from "../../store/template-status/actions";
import CONSTANTS from "../../consts";

function CssEditor() {
  const [data, setData] = useState({
    value: "",
    meta: {}
  })
  const dispatch = useDispatch()

  const onKeyDown = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  useEffect(() => {
    const getStyles = async () => {
      const meta = await AltrpMeta.getMetaByName("global_styles_editor");
      const valueStyle = meta.getMetaValue("")
      setData(state => ({
        ...state,
        value: valueStyle,
        meta
      }))
    }

    getStyles()
  }, [])

  const save = () => {
    if (confirm('Save changes?')) {
      data.meta.save()
      dispatch(setGlobalStylesCss(data.value))
      dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE))
    }
  }

  const onChange = (value) => {

    setData(state => ({
      ...state,
      value,
    }))
    data.meta.setMetaValue(value)
  }


  return (
    <div className="container__css-editor">
      <h2 className="title__css-editor">Global Css</h2>
      <AceEditor
        mode="css"
        theme="xcode"
        onChange={onChange}
        onKeyDown={onKeyDown}
        width="100%"
        fontSize={14}
        name="aceCssEditor"
        height="100%"
        value={data.value}
        enableLiveAutocompletion={true}
      />
      <button className="btn-css-save mdce" onClick={save}>Save</button>
    </div>
  )
}

export default CssEditor
