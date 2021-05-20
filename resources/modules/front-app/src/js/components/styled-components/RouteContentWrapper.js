import styled from 'styled-components';

const FRONT_DEFAULT_AREAS = [
  'content', 'footer', 'header', 'popups',
];
const RouteContentWrapper = styled.div`
  position: relative;
  ${({areas}) => {
    // console.log(FRONT_DEFAULT_AREAS);
    areas = areas.filter(area=>FRONT_DEFAULT_AREAS.indexOf(area.id) === -1)
    console.log(areas);
    let styles = '';
    if(! areas.length){
      return styles;
    }
    styles += '&&{display:grid;grid-template-rows:auto 1fr auto;'

    let columnsCount = areas.filter(area=>area.settings.area_type === 'sidebar'
      && area.settings.sidebar_location === 'left' ).length ? 1 : 0;
    columnsCount +=areas.filter(area=>area.settings.area_type === 'sidebar'
      && area.settings.sidebar_location === 'right' ).length ? 1 : 0;
    // console.log(columnsCount);
    let columnsGrid = '';
    let rightSidebar = areas.find(area=>area.settings.area_type === 'sidebar'
      && area.settings.sidebar_location === 'right');
    let leftSidebar = areas.find(area=>area.settings.area_type === 'sidebar'
      && area.settings.sidebar_location === 'left');

    columnsGrid += leftSidebar ? `${leftSidebar.settings.sidebar_width}` : '0';
    columnsGrid += ` auto `;
    columnsGrid += rightSidebar ? `${rightSidebar.settings.sidebar_width}` : '0';

    let contentRow = '';
    contentRow = leftSidebar ? `left-sidebar content` : `content content`;
    contentRow += rightSidebar ? ` right-sidebar` : ` content`;

    styles += `grid-template-columns:${columnsGrid};grid-template-areas:
    '${_.get(leftSidebar, 'settings.sidebar_type') === 'app_sidebar' ? 'left-sidebar' : 'header'} header ${_.get(rightSidebar, 'settings.sidebar_type') === 'app_sidebar' ? 'right-sidebar' : 'header'}'
    '${contentRow}'
    '${_.get(leftSidebar, 'settings.sidebar_type') === 'app_sidebar' ? 'left-sidebar' : 'footer'} footer ${_.get(rightSidebar, 'settings.sidebar_type') === 'app_sidebar' ? 'right-sidebar' :'footer'}';
    `

    // let gridTemplateAreas = ['header', 'header', 'header', con];
    // if(leftSidebar.setting.sidebar_type === 'content_sidebar'){}
    styles += '}'
    styles += '& .app-area_sidebar-location-left{grid-area:left-sidebar;}'
    styles += '& .app-area_sidebar-location-right{grid-area:right-sidebar;}'
    styles += '& .app-area_header{grid-area:header;}'
    styles += '& .app-area_footer{grid-area:footer;}'
    styles += '& .app-area_content{grid-area:content;}'
    return  styles;
  }}
`;
export default RouteContentWrapper;
