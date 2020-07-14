import React, {Component, Suspense} from "react";
import Query from "../../classes/Query";
// const AltrpTable = React.lazy(() => import("../altrp-table/component"));

class TableWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      TableComponent: ()=><div children="Loading..."/>
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }
  _componentDidMount(){
    import('../altrp-table/altrp-table').then(res=>{
      this.setState(state=>({...state,TableComponent:res.default}))
    })
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(this.state.TableComponent);
  //   console.log(_.isEqual(nextState, this.state));
  //   return false;
  //   return ! (_.isEqual(nextState, this.state));
  // }

  render(){
    let query = new Query(this.props.element.getSettings().table_query || {});
    return <this.state.TableComponent query={query} settings={this.props.element.getSettings()}/>;
  }
}

export default TableWidget

