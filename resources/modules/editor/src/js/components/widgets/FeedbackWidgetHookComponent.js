import {useRef, useState} from "react";
import {usePopper} from "react-popper";
import ReactDOM from "react-dom";
import Plus from "../../../svgs/plus.svg";
import uuid from 'uuid';
import {useSelector} from "react-redux";
import Trash from "./../../../svgs/trashFB.svg"


function FeedbackWidgetHookComponent({x, y, id, deleteComment, idWidget, settings, classes}) {
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

  const trashComment = (id) => {
    if (confirm("Are You Sure?")) {
      let filterMessages = messages.filter(message => message.id !== id)
      setMessages(filterMessages)
    }
  }

  const shiftEnter = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      submitMessage(e)
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
      <div className={`${classes} container__comment-fb` + ` altrp-element${idWidget}`} style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      >
        <div ref={circleRef} className={`${classes} circle-fb`}>{id}</div>
        <div style={styles.popper} {...attributes.popper} ref={popperRef} className="block__comment">
          <div className={`${classes} block__comment-top`}>
            <h2 className={`${classes} block__comment-top__text`}>Comments</h2>
            <Plus onClick={() => deleteComment(id)} className={`${classes} block__comment-top__close`} width={12} height={12}/>
          </div>
          <div style={{marginBottom: "20px"}} className={`${classes} container__messages`}>
            {messages.map(message => (
              <div key={message.id} className={`${classes} item__message`}>
                <div className={`${classes} item__message-top`}>
                  <strong className={`${classes} item__message-name`}>{message.name}</strong>
                  <Trash onClick={() => trashComment(message.id)} className={`${classes} trash__comment`}/>
                </div>
                <p className={`${classes} item__message-value`}>{message.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submitMessage}>
            <textarea onKeyDown={shiftEnter} ref={textareaRef} value={value} onChange={changeMessage} className={`${classes} block__comment-textarea`} placeholder="Leave a comment" rows="2"/>
            <div className={`${classes} block__comment-bottom`}>
              <button type="submit">{settings.messenger_text_btn || "Add Comment"}</button>
            </div>
          </form>
        </div>
      </div>, document.body
    )
  )
}

export default FeedbackWidgetHookComponent
