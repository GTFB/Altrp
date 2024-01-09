import React, {Component} from "react";
import {connect} from "react-redux";
import getCssVarFromGlobalStyle from "../../helpers/get-css-var-from-global-style";

const mapStateToProps = state => ({
  colors: state.globalStyles.colors
});

class GlobalPresetColors extends Component {

  state = {
    filter: ''
  }


  /**
   * Добавляем в палитру текущий цвет
   */
  addColorToPreset = async e => {
    // e.preventDefault();
    // e.stopPropagation();
    // const presetColors =
    //   this.props.presetColors instanceof AltrpMeta
    //     ? this.props.presetColors.getMetaValue([])
    //     : [];
    // let { value } = this.props;
    // console.log(value);
    // if (_.isString(value)) {
    //   value = { color: value };
    // }
    // if (value && !presetColors.find(color => value.color === color.color)) {
    //   presetColors.push(value);
    //   this.props.presetColors.setMetaValue([...presetColors]);
    //   this.props.presetColors.save();
    //   appStore.dispatch(setEditorMeta(this.props.presetColors));
    // }
  };
  /**
   * @param {{}} color
   */
  deletePresetColor = color => {
    // let presetColors =
    //   this.props.presetColors instanceof AltrpMeta
    //     ? this.props.presetColors.getMetaValue([])
    //     : [];
    // if (presetColors.find(presetColor => color.color === presetColor.color)) {
    //   presetColors = presetColors.filter(presetColor => color !== presetColor);
    //   this.props.presetColors.setMetaValue([...presetColors]);
    //   this.props.presetColors.save();
    //   appStore.dispatch(setEditorMeta(this.props.presetColors));
    // }
  }
  onChange = (e) => {
    const filter = e.target.value
    this.setState(state=>({...state, filter}))
  }

  render() {
    let presetColors = this.props.colors || [];
    const {filter} = this.state

    presetColors = presetColors.filter(c=>{
      if(! filter){
        return true
      }
      let _f = filter.split(' ')
      _f = _f.map(f=>f.trim())
      _f = _f.filter(f => f)
      return  _f.find(f=>{
        return c.name.toLowerCase().includes(f.toLowerCase())
      })
    })

    return (
      <div className="flexbox-fix control-color-preset-colors">
        <input className="control-field" name="__template_name"
               onChange={this.onChange}
               value={filter}/>
          {presetColors.map(color => {
            color = {...color}
            color = getCssVarFromGlobalStyle(color)
            return (
              <div
                className="control-color-preset-colors-wrapper"
                key={color.guid}
              >
                <div
                  className="control-color-preset-colors__item"
                  style={{backgroundColor: color.color}}
                  title={color.name || ''}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.changeValue(color);
                  }}
                  onContextMenu={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.deletePresetColor(color);
                  }}
                  tabIndex="0"
                />
              </div>
            );
          })}
          {/*<div className="control-color-preset-colors-wrapper">*/}
          {/*  <button*/}
          {/*    className="control-color-preset-colors__item control-color-preset-colors__item_add"*/}
          {/*    title="Add to Preset Colors"*/}
          {/*    onClick={this.addColorToPreset}*/}
          {/*    tabIndex="0"*/}
          {/*  >*/}
          {/*    <AddIcon width="13px" height="13px" />*/}
          {/*  </button>*/}
          {/*</div>*/}
      </div> );
  }
  }

  export default connect(mapStateToProps)(GlobalPresetColors);
