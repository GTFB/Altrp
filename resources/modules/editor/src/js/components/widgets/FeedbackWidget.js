import IconFb from "./../../../svgs/iconFb.svg";


(window.globalDefaults = window.globalDefaults || []).push(`
  .feedback__container {
   position: fixed;
   width: auto !important;
   right: 30px;
   bottom: 30px;
  }

  .feedback__button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 10px;
    border: none;
    color: white;
    font-size: 16px;
    background-color: #000;
    transition: gap .3s ease;
  }

  .feedback__button:hover {
    gap: 10px;
    transition: gap .3s ease;
  }

  .feedback__button svg {
    fill: rgb(255, 255, 255)
  }

  .feedback__button span {
    display: block;
    font-size: 0;
    opacity: 0;
    transition: opacity .2s ease, font-size .3s ease;
  }

  .feedback__button:hover span {
    display: block;
    font-size: inherit;
    opacity: 1;
    transition: opacity .2s ease, font-size .3s ease;
  }
`)

class FeedbackWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
    };

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }


  render() {
    return (
      <div className="feedback__container">
        <button className="feedback__button">
          <IconFb/>
          <span className="feedback__text">Send feedback</span>
        </button>
      </div>
    )
  }
}

export default FeedbackWidget;
