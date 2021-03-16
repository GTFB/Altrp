import styled from 'styled-components';

const WrapperComponent = styled.div``;

TableSubheaderComponent =
    ({
        rows,
        columnName,
        setRows,
        subHeaderSettings,
        title,
     })=>{
  const newRows = rows.map(row=>{
    if(_.get(row, `original.${columnName}`) == title ){

    }
  });

  return <WrapperComponent/>
};