
import {
  MenuItem,
  Input,
  Menu} from '@blueprintjs/core'
import {
  Popover2,
} from '@blueprintjs/popover2'
import AltrpInput from "../../../../../editor/src/js/components/altrp-input/AltrpInput";

export default class AutocompleteInput extends Component {

  onKeyDown = e => {
    this.setState(state=>({...state, isOpen: true}));

  };
  /**
   *
   * @param {text} text
   * @param {int} index
   * @returns {JSX.Element}
   */
  itemRenderer = (text, index)=>{
    return <MenuItem
      onClick={(e)=>{
        this.onChange(text)
        //this.onSelect(e)
      }
      }
      key={text + index}
      text={text}/>
  }
  onChange=(value)=>{
    this.props.onChange(value)
  }
  render(){
    const {options} = this.state

    this
    return (
      <div className={`altrp-input-wrapper altrp-input-wrapper_autocomplete`}>
        <Popover2
          isOpen={this.state.isOpen}
          // isOpen={true}
          disabled={!options.length}
          minimal={true}
          autoFocus={false}
          fill={true}
          position="bottom"
          popoverRef={this.popoverRef}
          usePortal={true}
          content={<Menu>
            {options.map(this.itemRenderer)}
          </Menu>}
        >
          <Input
            {...this.props}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
          />

        </Popover2>

      </div>
    );
  }
}
