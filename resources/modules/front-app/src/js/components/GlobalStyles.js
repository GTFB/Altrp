import { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux';
import { getResponsiveSetting } from '../helpers';
import { colorPropertyStyled } from '../helpers/styles';

const GlobalStyles = createGlobalStyle`${({elementsSettings})=>{
  let styles = '';

  _.each(elementsSettings, (item, id) => {

  });

  styles += `}`;

  return styles;
}}`;

function mapStateToProps(state) {
  return {elementsSettings: state.elementsSettings}
}

export default connect(mapStateToProps)(GlobalStyles)

