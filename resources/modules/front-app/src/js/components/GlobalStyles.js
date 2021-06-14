import {createGlobalStyle} from 'styled-components'
import {connect} from "react-redux";

const GlobalStyles = createGlobalStyle`${({elementsSettings})=>{
  console.log(elementsSettings);
}}`;

function mapStateToProps(state) {
  return {elementsSettings: state.elementsSettings}
}

export default connect(mapStateToProps)(GlobalStyles)
