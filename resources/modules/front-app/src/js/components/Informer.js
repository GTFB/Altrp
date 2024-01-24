import styled from "styled-components";
import isEditor from "../functions/isEditor";
import {typographicControllerToStyles} from "../helpers/styles";

const Div = styled.div`
  position: absolute;
  ${props => {


  if (!window.altrpHelpers) {
    return '';
  }
  let styles = ''
  const {
    getResponsiveSetting
  } = altrpHelpers
  let t = getResponsiveSetting(props, 't')
  let r = getResponsiveSetting(props, 'r')
  let l = getResponsiveSetting(props, 'l')
  let b = getResponsiveSetting(props, 'b')
  let tc = getResponsiveSetting(props, 'tc') || {}
  let bc = getResponsiveSetting(props, 'bc') || {}
  let tt = getResponsiveSetting(props, 'tt')
  let br = getResponsiveSetting(props, 'br')
  let bl = getResponsiveSetting(props, 'bl')
  if (tt) {
    tt = typographicControllerToStyles(tt)
    styles += tt
  }


  if (tc.cssVar) {
    styles += `color:${tc.cssVar};`
  } else if (tc.color) {
    styles += `color:${tc.color};`
  }
  let bcc = ''
  if (bc.cssVar) {
    bcc = bc.cssVar
    styles += `background-color:${bc.cssVar};`
  } else if (bc.color) {
    bcc = bc.color
    styles += `background-color:${bc.color};`
  }
  if(bcc && bl){
    styles += `box-shadow: 0 0 ${bl.size || 0}${bl.unit || 'px'} 0px ${bcc};`

  }
  if (!l && !r) {
    styles += `right: 0;`
  }

  if (!b && !t) {
    styles += `top: 0;`
  }
  if (Number(t)) {
    styles += `top: ${t}px;`
  } else if (t) {
    styles += `top: ${t};`
  }
  if (Number(r)) {
    styles += `right: ${r}px;`
  } else if (r) {
    styles += `right: ${r};`
  }
  if (Number(l)) {
    styles += `left: ${l}px;`
  } else if (l) {
    styles += `left: ${l};`
  }
  if (Number(b)) {
    styles += `bottom: ${b}px;`
  } else if (b) {
    styles += `bottom: ${b};`
  }
  if(br){
    styles += `border-radius:${br.size || 0}${br.unit || 'px'};`

  }
  if (!props.children && br) {
    styles += `width:${br.size || 0}${br.unit || 'px'};`
    styles += `height:${br.size || 0}${br.unit || 'px'};`
  } else  if (br) {
    styles += `padding-left:${br.size || 0}${br.unit || 'px'};`
    styles += `padding-right:${br.size || 0}${br.unit || 'px'};`
  }


  return styles
}}
`
export default class Informer extends React.Component {
  constructor(props) {
    super(props);
    if (!isEditor()) {
      appStore.subscribe(this.onStateUpdate)
    }
  }

  state = {
    show: isEditor()
  }
  onStateUpdate = () => {

    const {
      c = '',
      cd = '',
    } = this.props
    let content = altrpHelpers.getDataByPath(c)
    if(cd){
      let condition = altrpHelpers.getDataByPath(cd)
      this.setState(state=>({...state,show : ! ! condition}))

    } else if(! this.state.show){
      this.setState(state=>({...state,show : true}))

    }

    if (content !== this.state.content) {
      this.setState(state=>({...state,content}))
    }

  }
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if(isEditor()){
  //     return true
  //   }
  //   return content !== this.content
  // }

  render() {
    const {
      show
    } = this.state
    if(! show){
      return ''
    }
    let content = ''
    const {
      c = '',
      id = '',
    } = this.props


    if (isEditor()) {
      content = c
    } else if (c) {
      content = altrpHelpers.getDataByPath(c)
    }

    this._content = content
    return <Div className={`altrp-informer altrp-informer${id}`}
                {...this.props}

    >{content}</Div>
  }
}
