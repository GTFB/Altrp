import FONT_PROPERTIES from "../const/FONT_PROPERTIES";

const cachedStyles = {}

export default function getCssVarFromGlobalStyle(style){
  const settings = style
  if(! style){
    return {}

  }

  switch (style._type) {
    case 'color':{
      let varName = `--altrp-var-${style?._type}-${style.name.replace(/[^a-zA-Z0-9]/g,'-')}`
      if(!cachedStyles[varName] || cachedStyles[varName] !== _getValue(style)){
        cachedStyles[varName] = _getValue(style)
        //_updateRules()
      }
      style = {
      ...style,
        cssVar: `var(${varName})`
      }
    }break
    case 'font': {

      style = {
        ...style,
      }

      FONT_PROPERTIES.forEach(p=>{
        let varName = `--altrp-var-${style?._type}-${style.name.replace(/[^a-zA-Z0-9]/g,'-')}-${p}`
        if(!cachedStyles[varName] || cachedStyles[varName] !== style[p]){
          cachedStyles[varName] = style[p]

          //_updateRules()
        }
        style[`${p}CssVar`] = `var(${varName})`
        let fontSizeKey = `--altrp-var-${settings._type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g,'-')}-font-size`
        let fontSizeValue = `${
          settings?.size || '14'
        }${
          settings?.sizeUnit || 'px'
        }`
        if(!cachedStyles[fontSizeKey] || cachedStyles[fontSizeKey] !== fontSizeValue){
          cachedStyles[fontSizeKey] = fontSizeValue
          //_updateRules()
        }
      })
    } break;
    case 'effect': {

      const type = settings.type || "";
      const horizontal = settings.horizontal || 0;
      const vertical = settings.vertical || 0;
      const blur = settings.blur || 0;
      const spread = settings.spread || 0;
      const color = settings.color || "";
      let varName = `--altrp-var-${style?._type}-${style.name.replace(/[^a-zA-Z0-9]/g,'-')}`
      let varValue = `${type} ${horizontal}px ${vertical}px ${blur}px ${spread}px ${color}`
      if(!cachedStyles[varName] || cachedStyles[varName] !== varValue){
        cachedStyles[varName] = varValue

        //_updateRules()
      }

      style = {
        ...style,
        cssVar: `var(${varName})`
      }
    } break;
  }

  return style
}

function _getValue(style){
  if(style._type === 'color'){
    return style.color
  }
}

function _updateRules(){

  let styleElement = window.EditorFrame.contentDocument.querySelector('#altrp-css-vars')
  let _styleElement = document.querySelector('#altrp-css-vars')
  if(! styleElement){
    styleElement = window.EditorFrame.contentDocument.createElement('style')
    styleElement.setAttribute('id', 'altrp-css-vars')
    window.EditorFrame.contentDocument.head.appendChild(styleElement)
  }
  if(! _styleElement){
    _styleElement = document.createElement('style')
    _styleElement.setAttribute('id', 'altrp-css-vars')
    document.head.appendChild(_styleElement)
  }
  let _css = `:root{
  `
  _.map(cachedStyles, ( value, varName)=>{
    if(value){
      if(varName.match(/-family$/)){
        value = `"${value}", Arial, sans-serif`
      }
      _css += `${varName}: ${value};`
    }
  })

  _css += '}'
  styleElement.innerHTML = _css
  _styleElement.innerHTML = _css
}

