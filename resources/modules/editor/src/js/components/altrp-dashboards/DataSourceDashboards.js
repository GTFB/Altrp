import {getDataByPath} from "../../../../../front-app/src/js/helpers";

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
    return <div/>
  }

}

export default DataSourceDashboards;