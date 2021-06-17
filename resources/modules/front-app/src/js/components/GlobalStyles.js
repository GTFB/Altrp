import { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux';
import { getHeadingStyles } from './helpers/stylesForTheHeading';
import { getTextStyles } from './helpers/stylesForTheText';
import { getTableStyles } from './helpers/stylesForTheTable';
import { getPostsStyles } from './helpers/stylesForThePosts';

const GlobalStyles = createGlobalStyle`${({elementsSettings})=>{
  let styles = '';

  _.each(elementsSettings, (item, id) => {
    switch (item.name) {
      case 'heading': {
        styles += getHeadingStyles(item.settings, id);
      }
        break;
      case 'text': {
        styles += getTextStyles(item.settings, id);
      }
        break;
      case 'table': {
        styles += getTableStyles(item.settings, id);
      }
        break;
      case 'posts': {
        styles += getPostsStyles(item.settings, id);
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

