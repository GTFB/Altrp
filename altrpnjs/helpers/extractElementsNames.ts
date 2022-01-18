/**
 * @param array $element
 * @param array $elementNames
 * @param boolean $only_react_elements
 */
import is_array from "./is_array";
import isString from "lodash/isString"
import findIndex from "lodash/findIndex"

function recurseMapElements( element, callback ){
  callback(element);
  if( element.name ==='menu'){

  }
  if( element.children && is_array(element.children) ){
    element.children.forEach((child) => {
      recurseMapElements( child, callback );
    })
  }
}

function _extractElementsNames( element, elementNames, only_react_elements ) {
  const DEFAULT_REACT_ELEMENTS = [
    'action-trigger',
    'input',
    'input-select',
    'input-date-range',
    'input-select-tree',
    'input-multi-select',
    'input-select2',
    'input-radio',
    'input-checkbox',
    'input-wysiwyg',
    'input-textarea',
    'input-slider',
    'input-range-slider',
    'input-image-select',
    'input-accept',
    'input-text',
    'input-text-common',
    'input-text-autocomplete',
    'input-password',
    'input-number',
    'input-tel',
    'input-email',
    'input-date',
    'input-hidden',
    'input-file',
    'input-gallery',
    'posts',
    'breadcrumbs',
    'carousel',
    'map',
    'text',
    'map_builder',
    'menu',
    'point-diagram',
    'pie-diagram',
    'line-diagram',
    'bar-diagram',
    'nav',
    'breadcrumbs',
    'dashboards',
    'tour',
    'icon',
    'export',
    'template',
    'dropbar',
    'gallery',
    'table',
    'tabs',
    'heading-type-animating',
    'scheduler',
    'tree',
    'list',
    'stars',
    'progress-bar'
  ];
  if (!is_array(elementNames)) {
    elementNames = [];
  }
  if (!element.name || !isString(element.name)) {
    return;
  }

  if(
    !(only_react_elements) &&
    !(element.settings.react_element) ||
    DEFAULT_REACT_ELEMENTS.findIndex(element.name) !== -1
  ){
    if(element.name === 'section' || element.name === "root-element" || element.name === 'column'){
      recurseMapElements( element, function( element ) {
        if(element.name && findIndex(elementNames, name => name === element.name) === -1 ) {
          elementNames.push(element.name);
        }
      } );
    }
  }
  // if( isset( $element['children'] ) && is_array( $element['children'] ) ){
  //   foreach ( $element['children'] as $child ) {
  //     _extractElementsNames( $child, $elementNames, $only_react_elements );
  //   }
  // }
  // if( $element['name'] === 'template' && data_get( $element, 'settings.template' ) ){
  //   extractElementsNamesFromTemplate( data_get( $element, 'settings.template' ), $elementNames );
  // }
  // if( $element['name'] === 'posts' && data_get( $element, 'settings.posts_card_template' ) ){
  //   extractElementsNamesFromTemplate( data_get( $element, 'settings.posts_card_template' ), $elementNames );
  // }
  // if( $element['name'] === 'posts' && data_get( $element, 'settings.posts_card_hover_template' ) ){
  //   extractElementsNamesFromTemplate( data_get( $element, 'settings.posts_card_hover_template' ), $elementNames );
  // }
  // if( $element['name'] === 'table'
  //   && data_get( $element, 'settings.row_expand' )
  //   && data_get( $element, 'settings.card_template' ) ){
  //   extractElementsNamesFromTemplate( data_get( $element, 'settings.card_template' ), $elementNames );
  // }
  // if( $element['name'] === 'dropbar'
  //   && data_get( $element, 'settings.template_dropbar_section' ) ){
  //   extractElementsNamesFromTemplate( data_get( $element, 'settings.template_dropbar_section' ), $elementNames );
  // }
  // if( $element['name'] === 'table'
  //   && data_get( $element, 'settings.tables_columns' ) ){
  //   $columns = data_get( $element, 'settings.tables_columns', [] );
  //   foreach ($columns as $column) {
  //     if(data_get($column, 'column_template')){
  //       extractElementsNamesFromTemplate( data_get($column, 'column_template'), $elementNames );
  //     }
  //   }
  // }
  // if( $element['name'] === 'tabs'
  //   && data_get( $element, 'settings.items_tabs' ) ){
  //   $tabs = data_get( $element, 'settings.items_tabs', [] );
  //   foreach ($tabs as $tab) {
  //     if(data_get($tab, 'card_template')){
  //       extractElementsNamesFromTemplate( data_get($tab, 'card_template'), $elementNames );
  //     }
  //   }
  // }
  // if( $element['name'] === 'table'
  //   && data_get( $element, 'settings.row_expand' )
  //   && data_get( $element, 'settings.tables_columns' )
  //   && is_array( data_get( $element, 'settings.tables_columns' ) ) ){
  //   $columns = data_get( $element, 'settings.tables_columns' );
  //   foreach ( $columns as $column ) {
  //     if( data_get( $column, 'column_template') ){
  //       extractElementsNamesFromTemplate( data_get( $column, 'column_template'), $elementNames );
  //     }
  //   }
  // }
}

/**
 * @return array
 * @param areas
 * @param _only_react_elements
 */
function extractElementsNames(areas: any[] = [], _only_react_elements = false){
  let elementNames = [];
  areas.forEach(area => {
    if(area.template?.data) {
      const data = area.template.data
      _extractElementsNames( data, elementNames, _only_react_elements );
    }
  })

  // elementNames = array_unique( elementNames );
  // elementNames = array_values( elementNames );
  return elementNames;
}

export default extractElementsNames
