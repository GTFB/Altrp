import * as React from "react";
import { MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

class BlurprintMultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: []
    };
  }

  itemRenderer = (item, { handleClick }) => {
    return (
      <MenuItem
        icon={this.isItemSelected(item) ? "tick" : "blank"}
        text={item.name}
        onClick={handleClick}
        shouldDismissPopover={false}
      />
    );
  };

  tagRenderer = (item) => {
    return item.name;
  };

  isItemSelected = (item) => {
    let itemString = JSON.stringify(item);
    let selectedItemsString = JSON.stringify(this.state.selectedItems);
    return selectedItemsString.includes(itemString);
  };

  handleItemSelect = (item) => {
    if (!this.isItemSelected(item)) {
      this.setState({ selectedItems: this.state.selectedItems.concat(item) });
    }
  };

  handleTagRemove = (item) => {
    this.setState({
      selectedItems: this.state.selectedItems.filter((i) => i.name !== item)
    });
  };

  render() {

    return (
      <div>
        <MultiSelect
          shouldDismissPopover={false}
          items={this.props.items}
          itemRenderer={this.itemRenderer}
          onItemSelect={this.handleItemSelect}
          tagRenderer={this.tagRenderer}
          selectedItems={this.state.selectedItems}
          tagInputProps={{
            onRemove: this.handleTagRemove
          }}
        > </MultiSelect>
      </div>
    );
  }
}

export default BlurprintMultiSelect;
