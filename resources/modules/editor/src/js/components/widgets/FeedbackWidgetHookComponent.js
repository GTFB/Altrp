import {useRef, useState} from "react";
import {usePopper} from "react-popper";
import ReactDOM from "react-dom";
import Plus from "../../../svgs/plus.svg";
import uuid from 'uuid';
import {useSelector} from "react-redux";


function FeedbackWidgetHookComponent({x, y, id, deleteComment, idWidget, settings}) {
  const circleRef = useRef(null)
  const popperRef = useRef(null)
  const textareaRef = useRef(null)
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState([])
  const { name } = useSelector(({currentUser}) => currentUser.data)

  const { styles, attributes } = usePopper(circleRef.current, popperRef.current, {
    placement: "right",
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 20],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left']
        },
      },
    ],
  });

  const submitMessage = (e) => {
    e.preventDefault();
    if (value) {
      setMessages([...messages, {
        id: uuid.v4(),
        name: name || "You",
        text: value
      }])
      setValue("")
      textareaRef.current.style.height = "auto"
    }
  }

  const changeMessage = (e) => {
    let textarea = e.currentTarget
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    setValue(e.target.value)
  }

  return (
    ReactDOM.createPortal(
      <div className={"container__comment-fb" + ` altrp-element${idWidget}`} style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      >
        <div ref={circleRef} className="circle-fb">{id}</div>
        <div style={styles.popper} {...attributes.popper} ref={popperRef} className="block__comment">
          <div className="block__comment-top">
            <h2 className="block__comment-top__text">Comments</h2>
            <Plus onClick={() => deleteComment(id)} className="block__comment-top__close" width={12} height={12}/>
          </div>
          <div style={{marginBottom: "20px"}} className="container__messages">
            {messages.map(message => (
              <div key={message.id} className="item__message">
                <strong className="item__message-name">{message.name}</strong>
                <p className="item__message-value">{message.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submitMessage}>
            <textarea ref={textareaRef} value={value} onChange={changeMessage} className="block__comment-textarea" placeholder="Leave a comment" rows="2"/>
            <div className="block__comment-bottom">
              <button type="submit">{settings.messenger_text_btn || "Add Comment"}</button>
            </div>
          </form>
        </div>
      </div>, document.body
    )
  )
}

export default FeedbackWidgetHookComponent
