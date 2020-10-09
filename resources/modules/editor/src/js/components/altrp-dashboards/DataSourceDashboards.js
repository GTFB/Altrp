import {getDataByPath} from "../../../../../front-app/src/js/helpers";
import GridLayout from 'react-grid-layout';

class DataSourceDashboards extends Component{

  constructor(props) {
    super(props);
    this.state = {
      repeater: _.cloneDeep(props.element.getSettings('rep', []))
    };
  }

  /**
   * Компонент обновился
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if(! _.isEqual(prevProps.settings.rep, this.props.settings.rep)){
      this.setState(state => ({...  state, repeater: this.props.settings.rep}));
    }
  }

  render(){
    // console.log(this.state.repeater);
    let repeater = this.props.element.getSettings('rep', []);
    let dataSources = repeater.map(r=>{
      let data = getDataByPath(r.path, []);
      data = data.map(d=>{
        return {
          data: _.get(d, r.data),
          key: _.get(d, r.key),
        };
      });
      return {
        ...r,
        data ,
      };
    });

    console.log(dataSources);
    return (
      <GridLayout className="layout" cols={12} rowHeight={30}>
        <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
        <div key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
        <div key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>
      </GridLayout>
    );
  }

}

export default DataSourceDashboards;