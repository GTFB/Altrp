import './altrp-input.scss'
const MaskedInput = React.lazy(()=>import('react-text-mask'));

class AltrpInput extends Component {
  render() {
    const inputProps = {...this.props};
    inputProps.mask = this.props.content_mask || [/([\s\S]+?)/g];
    if(this.props.settings.content_mask){
      let mask = this.props.settings.content_mask.split('');
      mask = mask.map(m=>{
        switch(m){
          case '_':{
            return /\d/;
          }
          case '*':{
            return /\S/;
          }
          default: return m;
        }
      });
      inputProps.mask = mask;
      inputProps.guide = true;
      return <React.Suspense fallback={<input  {...this.props}/>}>
        <MaskedInput {...inputProps}/>
      </React.Suspense>
    }
    return <input {...inputProps}/>
  }
}

export default AltrpInput