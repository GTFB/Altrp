import React, {Component} from "react";
import styled from "styled-components";
import DesignCategorySelect from "./DesignCategorySelect";

const StyledWrapper = styled.div`
  padding: 25px 15px 0;
  width: 100%;
  overflow: auto;
`;

const Heading = styled.p`
  text-transform: uppercase;
  font-size: 11px;
`;

const MenuGroup = styled.div``;

const MenuItems = styled.div`
  margin: 15px 0 25px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
`;

const Item = styled.div`
  display: table;
  width: 100%;
  height: 40px;
  cursor: pointer;
  margin-bottom: 1px;
  padding: 10px;
  background-color: #fff;
`;

class CommonPanel extends Component {
  render() {
    return (
      <StyledWrapper>
        <MenuGroup>
          <Heading>Design System</Heading>
          <DesignCategorySelect/>
          <MenuItems>
            <Item onClick={this.props.showGlobalColorsPanel}>
              Palette
            </Item>
            <Item onClick={this.props.showGlobalFontsPanel}>Text Styles</Item>
            <Item onClick={this.props.showGlobalEffectsPanel}>
              Effect Styles
            </Item>
            <Item onClick={this.props.showGlobalSizes}>
              Spacing
            </Item>
          </MenuItems>
        </MenuGroup>
      </StyledWrapper>
    );
  }
}

export default CommonPanel;
