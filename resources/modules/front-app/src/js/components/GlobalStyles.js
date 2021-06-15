import { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux';
import { getHeadingStyles } from './helpers/stylesForTheHeading';

const GlobalStyles = createGlobalStyle`${({elementsSettings})=>{
  let styles = '';

  _.each(elementsSettings, (item, id) => {
    switch (item.name) {
      case 'heading': {
        styles += getHeadingStyles(item.settings, id);
      }
        break;
    }
  });

  return styles;
}}`;

function mapStateToProps(state) {
  return {elementsSettings: state.elementsSettings}
}

export default connect(mapStateToProps)(GlobalStyles)

