import AltrpQueryComponent from "../../altrp-query-component/altrp-query-component";
import {isEditor, prepareURLForEmail} from "../../../../../../front-app/src/js/helpers";

export function EmailTableComponent(props){
  const {data, settings,  } = props;
  const {
    tables_columns: columns = [],
    table_style_table_border_type,
  } = settings;
  const tableStyles = {
    borderCollapse: 'collapse',
    border: `${table_style_table_border_type} ${_.get(settings, 'table_style_table_border_width.size') + _.get(settings, 'table_style_table_border_width.unit')} ${_.get(settings, 'table_style_table_border_color.color')}`
  };
  const defaultCellStyle = {
    textAlign: settings.table_table_header_alignment || 'center',
    verticalAlign: settings.table_table_header_alignment || 'center',
  };
  if(settings.table_style_table_border_type && settings.table_style_table_border_type !== 'none'){
    defaultCellStyle.border = `${settings.table_style_table_border_type} ${_.get(settings, 'table_style_table_border_color.color')}`;
    defaultCellStyle.borderLeftWidth = `${_.get(settings, 'table_style_table_border_width.left')}${_.get(settings, 'table_style_table_border_width.unit') || 'px'}`;
    defaultCellStyle.borderTopWidth = `${_.get(settings, 'table_style_table_border_width.top')}${_.get(settings, 'table_style_table_border_width.unit') || 'px'}`;
    defaultCellStyle.borderRightWidth = `${_.get(settings, 'table_style_table_border_width.right')}${_.get(settings, 'table_style_table_border_width.unit') || 'px'}`;
    defaultCellStyle.borderBottomWidth = `${_.get(settings, 'table_style_table_border_width.bottom')}${_.get(settings, 'table_style_table_border_width.unit') || 'px'}`;
  }

  return <table width="100%"
                style={tableStyles}>
    <thead>
    <tr>
      {columns.map(column => {
        const headCellStyle = {...defaultCellStyle};

        if(_.get(settings, 'table_style_header_text_color.colorPickedHex')){
          headCellStyle.color = _.get(settings, 'table_style_header_text_color.colorPickedHex');
        }

        if(column.column_header_alignment){
          headCellStyle.textAlign = column.column_header_alignment
        }

        headCellStyle.paddingLeft = `${_.get(settings, 'table_style_header_padding.left')}${_.get(settings, 'table_style_header_padding.unit') || 'px'}`;
        headCellStyle.paddingTop = `${_.get(settings, 'table_style_header_padding.top')}${_.get(settings, 'table_style_header_padding.unit') || 'px'}`;
        headCellStyle.paddingRight = `${_.get(settings, 'table_style_header_padding.right')}${_.get(settings, 'table_style_header_padding.unit') || 'px'}`;
        headCellStyle.paddingBottom = `${_.get(settings, 'table_style_header_padding.bottom')}${_.get(settings, 'table_style_header_padding.unit') || 'px'}`;

        headCellStyle.fontFamily = _.get(settings, 'table_style_header_font.family') || 'Arial';
        headCellStyle.lineHeight = _.get(settings, 'table_style_header_font.lineHeight') || '1.5';
        headCellStyle.fontSize = (_.get(settings, 'table_style_header_font.size') || '16')
            + (_.get(settings, 'table_style_header_font.sizeUnit') || 'px');
        headCellStyle.letterSpacing = _.get(settings, 'table_style_header_font.spacing');
        headCellStyle.fontStyle = _.get(settings, 'table_style_header_font.style') || '';
        headCellStyle.textTransform = _.get(settings, 'table_style_header_font.transform') || '';

        if(settings.table_style_header_border_type && settings.table_style_header_border_type !== 'none'){
          headCellStyle.border = `${settings.table_style_header_border_type} ${_.get(settings, 'table_style_header_border_color.color')}`;
          headCellStyle.borderLeftWidth = `${_.get(settings, 'table_style_header_border_width.left')}${_.get(settings, 'table_style_header_border_width.unit') || 'px'}`;
          headCellStyle.borderTopWidth = `${_.get(settings, 'table_style_header_border_width.top')}${_.get(settings, 'table_style_header_border_width.unit') || 'px'}`;
          headCellStyle.borderRightWidth = `${_.get(settings, 'table_style_header_border_width.right')}${_.get(settings, 'table_style_header_border_width.unit') || 'px'}`;
          headCellStyle.borderBottomWidth = `${_.get(settings, 'table_style_header_border_width.bottom')}${_.get(settings, 'table_style_header_border_width.unit') || 'px'}`;
        }
        const columnProps = {
          style: headCellStyle,
        };
        if(_.get(settings, 'table_style_header_background.colorPickedHex')){
          headCellStyle.backgroundColor = _.get(settings, 'table_style_header_background.colorPickedHex');
        }
        if(column.column_width){
          columnProps.width = column.column_width + '%';
        }
        return <th key={column.id} {...columnProps}>{column.column_name || ''}</th>
      })}
    </tr>
    </thead>
    <tbody>
    {
      data.map((row, idx) => {
        return <tr key={idx}>
          {columns.map(column => {
            let cellContent = 'Test data';
            if(! isEditor()){
              cellContent = _.get(row, column.accessor) || '';
              if(column.column_link){
                let url = prepareURLForEmail(column.column_link, row);
                cellContent = <a href={url} style={{
                  fontFamily: _.get(settings, 'table_link_font.family') || 'Arial',
                  fontSize:  _.get(settings, 'table_link_font.size') || 'inherit',
                  fontStyle:  _.get(settings, 'table_link_font.style') || 'inherit',
                  lineHeight:  _.get(settings, 'table_link_font.lineHeight') || 'inherit',
                  color: _.get(settings, 'table_link_color.colorPickedHex') || 'inherit',
                  textDecoration:  _.get(settings, 'table_link_font.decoration') || 'inherit',
                  textTransform:  _.get(settings, 'table_link_font.transform') || 'inherit',
                }}>{cellContent}</a>
              }
            } else {
              if(column.column_link){
                cellContent = <span style={{
                  fontFamily: _.get(settings, 'table_link_font.family') || 'Arial',
                  fontSize:  _.get(settings, 'table_link_font.size') || 'inherit',
                  fontStyle:  _.get(settings, 'table_link_font.style') || 'inherit',
                  lineHeight:  _.get(settings, 'table_link_font.lineHeight') || 'inherit',
                  color: _.get(settings, 'table_link_color.colorPickedHex') || 'inherit',
                  textDecoration:  _.get(settings, 'table_link_font.decoration') || 'inherit',
                  textTransform:  _.get(settings, 'table_link_font.transform') || 'inherit',
                }}>{cellContent}</span>
              }
            }
            const cellStyles = {...defaultCellStyle};

            cellStyles.textAlign =  column.column_body_alignment || settings.table_table_body_alignment;
            cellStyles.verticalAlign =  column.column_cell_vertical_alignment || settings.cell_vertical_alignment;

            if(settings.table_style_body_border_type && settings.table_style_body_border_type !== 'none'){
              cellStyles.border = `${settings.table_style_header_border_type} ${_.get(settings, 'table_style_body_border_color_.color')}`;
              cellStyles.borderLeftWidth = `${_.get(settings, 'table_style_body_border_width.left')}${_.get(settings, 'table_style_body_border_width.unit') || 'px'}`;
              cellStyles.borderTopWidth = `${_.get(settings, 'table_style_body_border_width.top')}${_.get(settings, 'table_style_body_border_width.unit') || 'px'}`;
              cellStyles.borderRightWidth = `${_.get(settings, 'table_style_body_border_width.right')}${_.get(settings, 'table_style_body_border_width.unit') || 'px'}`;
              cellStyles.borderBottomWidth = `${_.get(settings, 'table_style_body_border_width.bottom')}${_.get(settings, 'table_style_body_border_width.unit') || 'px'}`;
            }

            cellStyles.paddingLeft = `${_.get(settings, 'table_style_body_cell_padding.left')}${_.get(settings, 'table_style_body_cell_padding.unit') || 'px'}`;
            cellStyles.paddingTop = `${_.get(settings, 'table_style_body_cell_padding.top')}${_.get(settings, 'table_style_body_cell_padding.unit') || 'px'}`;
            cellStyles.paddingRight = `${_.get(settings, 'table_style_body_cell_padding.right')}${_.get(settings, 'table_style_body_cell_padding.unit') || 'px'}`;
            cellStyles.paddingBottom = `${_.get(settings, 'table_style_body_cell_padding.bottom')}${_.get(settings, 'table_style_body_cell_padding.unit') || 'px'}`;

            cellStyles.fontFamily = _.get(settings, 'table_style_body_font.family') || 'Arial';
            cellStyles.lineHeight = _.get(settings, 'table_style_body_font.lineHeight') || '1.5';
            cellStyles.fontSize = (_.get(settings, 'table_style_body_font.size') || '16')
                + (_.get(settings, 'table_style_body_font.sizeUnit') || 'px');
            cellStyles.letterSpacing = _.get(settings, 'table_style_body_font.spacing');
            cellStyles.fontStyle = _.get(settings, 'table_style_body_font.style') || '';
            cellStyles.textTransform = _.get(settings, 'table_style_body_font.transform') || '';

            if(_.get(settings, 'table_style_body_border_text_color.colorPickedHex')){
              cellStyles.color = _.get(settings, 'table_style_body_border_text_color.colorPickedHex');
            }
            const cellProps = {
              style: cellStyles,
            };

            if(_.get(settings, 'table_style_body_border_background.colorPickedHex')){
              cellStyles.backgroundColor = _.get(settings, 'table_style_body_border_background.colorPickedHex');
            }
            return <td key={column.id + idx} {...cellProps}>{cellContent}</td>
          })}
        </tr>
      })
    }
    </tbody>
  </table>;
}

export default (props) => {
  if(isEditor()) {
    props = {...props};
    props.data = Array.from({length: 10}, () => ({}));
    return <EmailTableComponent {...props}/>
  }
  return <AltrpQueryComponent {...props}><EmailTableComponent/></AltrpQueryComponent>
}
