import styled from "styled-components";

export const RepeaterBlock = styled.div`
`

export const RepeaterContainer = styled.div`
  width: 100%;
`

export const RepeaterAdd = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: #87ca00;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  padding: 4px 10px;
  border-radius: 0.25rem;
  font-size: 10px;
  margin-top: 10px;
`

export const RepeaterBlockHeader = styled.div`
  height: 40px;
  border-left: 1px solid #d5d7de;
  border-right: 1px solid #d5d7de;
  border-top: 1px solid #d5d7de;
`

export const RepeaterBlockContent = styled.div`
  border: 1px solid #d5d7de;
  padding: 10px;

  ${(props) => props.last ? "" : "border-bottom-style: none;"}
`

export const RepeaterBlockClose = styled.div`
  height: 40px;
  width: 40px;
  border-left: 1px solid #d5d7de;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`
