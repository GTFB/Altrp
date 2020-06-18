import React, {Component, Suspense} from "react";
import Query from "../../classes/Query";
const AltrpTable = React.lazy(() => import("../altrp-table/component"));

class TableWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  render(){
    let query = new Query(this.state.settings.table_query);
    return <Suspense fallback={<div>Loading...</div>}>
      <AltrpTable setting={this.state.settings} query={query} />
    </Suspense>;
  }
}

export default TableWidget

