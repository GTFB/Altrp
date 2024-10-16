import Resource from '../../../editor/src/js/classes/Resource'
import {connect} from "react-redux";

class TopMemoryUsage extends Component{
  state = {
    used: 0,
    updating:false,
  }
  resource = new Resource({route: '/admin/ajax/get_health_check'})
  componentDidMount =async ()=> {
    this.interval = setInterval(async () =>{
      if(this.state.updating){
        return
      }
      const {testEnable} = this.props.adminState;
      if(testEnable){
        this.setState(state=>({...state,
          updating:true,}))
        let res
        try {
          res = await this.resource.getAll()

        }catch (e) {
          console.error(e)
        }
        this.setState(state=>({...state,
          updating:false,
          used: res?.data?.used || 0,}))
      }
    }, 2500)

    const {testEnable} = this.props.adminState;
    if(testEnable){
      try {
        const res = await this.resource.getAll()
        this.setState(state=>({...state, used: res.data.used}))
      }catch (e) {
        console.error(e);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const {used,} = this.state
    const {testEnable} = this.props.adminState;
    let color = '#0dcaf0'
    if(used > 600){
      color = '#dc3545'
    } else if(used >300 ){
      color = '#ffc107'
    }

    return testEnable ? <div className="top-memory-usage font-weight-bold mr-2" style={{
      color
    }}>
      {used ? `Memory usage: ${used}MB` : '' }
    </div> : ''
  }
}

function mapStateToProps(state) {
  return {adminState: state.adminState}
}

export default connect(mapStateToProps)(TopMemoryUsage);
