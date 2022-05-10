import FeedbackWidgetHook from "./FeedbackWidgetHook";

(window.globalDefaults = window.globalDefaults || []).push(`
  .feedback__container {
   position: fixed;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 250px !important;
   padding: 10px;
   background-color: #6a727c;
   left: 50%;
   transform: translateX(-50%);
   bottom: 30px;
   z-index: 300;
   border-radius: 4px;
  }

  .feedback__container-сustom {
   position: fixed;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 250px !important;
   padding: 10px;
   background-color: #6a727c;
   z-index: 300;
   border-radius: 4px;
  }

  .feedback__button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    border: none;
    color: white;
    font-size: 16px;
    background-color: rgb(137, 194, 138);
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .feedback__button:hover {
    background-color: rgb(120, 169, 121);
    transition: background-color 0.3s ease;
  }

  .feedback__button-active {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    border: none;
    color: white;
    font-size: 16px;
    background-color: rgb(218, 65, 61);
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .feedback__button-active svg {
    transform: rotate(-45deg);
  }

  .feedback__button-active:hover {
    background-color: rgb(174, 84, 89);
    transition: background-color 0.3s ease;
  }

  .container__comment-fb {
    position: absolute;
    z-index: 301;
  }

  .circle-fb {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    background-color: #61c9ff;
    border: 3px solid #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .block__comment {
    position: absolute;
    background-color: white;
    top: -70px;
    left: 70px;
    width: 400px;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgb(35 40 45 / 12%), 0 0 3px rgb(0 0 0 / 20%);
  }

  .block__comment-textarea {
    font-size: 1em;
    width: 100%;
    background-color: #f3f3f3;
    color: #777;
    border: none;
    display: block;
    padding: 15px;
    margin-bottom: 20px;
    overflow-wrap: break-word;
    resize: none;
    line-height: 1.4em;
    max-height: 350px;
    overflow-x: hidden;
  }

  .block__comment-bottom button {
    padding: 10px 22px;
    border: none;
    color: white;
    text-transform: uppercase;
    font-size: 10px;
    background-color: #61c9ff;
    border-radius: 2px;
    transition: background-color 0.2s ease;
  }

  .block__comment-bottom button:hover {
    background-color: #6a727c;
    transition: background-color 0.2s ease;
  }

  .block__comment-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .block__comment-top__text {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    color: #b1b1b1;
    letter-spacing: 2px;
    margin: 0;
  }

  .block__comment-top__close {
    transform: rotate(-45deg);
    cursor: pointer;
  }

  .block__comment-top__close path {
    fill: #000;
  }

  .container__messages {
    max-height: 250px;
    overflow-x: hidden;
    overscroll-behavior: contain;
  }

  .item__message {
    color: #4a5568;
    padding-right: 10px;
  }

  .item__message:not(:last-child) {
    margin-bottom: 10px;
  }

  .item__message-value {
    margin-top: 2px;
    margin-bottom: 0;
    font-size: 13px;
    word-break: break-word;
  }

  .item__message:hover .trash__comment {
    display: block;
    cursor: pointer;
  }

  .item__message-top {
     display: flex;
     align-items: center;
     justify-content: space-between;
  }

  .trash__comment {
    display: none;
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

  /**
   * Получить css классы для feedback widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return (
     <FeedbackWidgetHook classes={classes} idWidget={this.props.element.getId()} settings={this.state.settings}/>
    )
  }
}

export default FeedbackWidget;
