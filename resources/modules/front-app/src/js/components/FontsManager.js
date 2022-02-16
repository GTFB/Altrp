import {Helmet} from "react-helmet";
import {renderFontLink, delay} from "../helpers";


class FontsManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fonts: [],
    };
    this.helmetRef = React.createRef();
    window.helmetRef = this.helmetRef;
  }

  async componentDidMount() {
    await delay(1000);
    this.setState(state=>({...state, renderFonts: true}));
  }

  /**
   *
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if(!this.state.renderFonts){
      return;
    }
    let fonts = new Set();
      const fontsPairs = _.toPairs(this.props.altrpFonts.getData());
    fontsPairs.forEach(([key, value]) => {
      fonts.add(value);
    });
    fonts = _.toArray(fonts);
    if (_.isEqual(fonts, this.state.fonts)) {
      return;
    }
    this.setState(state => ({...state, fonts}));
  }

  render() {
    const {fonts} = this.state;

    return <Helmet ref={this.helmetRef}>
      {fonts.map(renderFontLink)}
    </Helmet>
  }
}

function mapStateToProps(state) {
  return {
    altrpFonts: state.altrpFonts,
  };
}

export default window.reactRedux.connect(mapStateToProps)(FontsManager);


