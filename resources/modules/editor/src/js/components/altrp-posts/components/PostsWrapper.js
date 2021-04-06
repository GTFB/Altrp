import styled from "styled-components";

const PostsWrapper = styled.div`{
  grid-template-columns: repeat(${({columnsCount})=>columnsCount}, 1fr);
  display: grid;    
  ${({posts_columns_gap, posts_rows_gap}) =>{
    let styles = '';
    if(posts_columns_gap && ! Number(posts_columns_gap)){
      styles += `grid-column-gap:${posts_columns_gap};`;
    } else if(Number(posts_columns_gap)){
      styles += `grid-column-gap:${posts_columns_gap}px;`;
    }
    if(posts_rows_gap && ! Number(posts_rows_gap)){
      styles += `grid-row-gap:${posts_rows_gap};`;
    } else if(Number(posts_rows_gap)){
      styles += `grid-row-gap:${posts_rows_gap}px;`;
    }
    return styles;
  }}
`;

export default PostsWrapper;