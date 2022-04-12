import Plus from "../../../svgs/plus.svg";
import {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import { usePopper } from 'react-popper';
const {isEditor} = window.altrpHelpers;


function FeedbackWidgetHook() {
  const [state, setState] = useState({
    active: false,
    windowComment: null,
    loadedRef: false
  })
  const containerRef = useRef(null)
  const circleRef = useRef(null)
  const popperRef = useRef(null)
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
        name: 'arrow',
        options: {
          padding: 5,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left']
        },
      }
    ],
  });

  const isLoadedRef = () => {
    setState(state => ({
      ...state,
      loadedRef: true
    }))
  }

  const addComment = (e) => {
    const path = e.path
    let a = path.includes(containerRef.current) || path.includes(popperRef.current)
    if (!a && state.active) {
      setState(state => ({
        ...state,
        active: false,
        windowComment: {
          x: e.pageX - 18,
          y: e.pageY - 18
        }
      }))
      isLoadedRef()
    }
  }

  const closeComment = () => {
    setState(state => ({
      ...state,
      windowComment: null
    }))
  }

  useEffect(() => {
    if (!isEditor()) {
      document.body.addEventListener("click", addComment)
    }

    return () => {
      if (!isEditor()) {
        document.body.removeEventListener("click", addComment)
      }
    }
  }, [state])

  const toggleClick = () => {
    setState(state => ({
      ...state,
      active: !state.active
    }))
  }

  const changeHeight = (e) => {
    let textarea = e.currentTarget
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <>
      <div ref={containerRef} className="feedback__container">
        <button onClick={toggleClick} className={`feedback__button${state.active ? "-active" : ""}`}>
          <Plus width={14} height={14}/>
          <span className="feedback__text">feedback</span>
        </button>
      </div>
      {state.windowComment && (
        ReactDOM.createPortal(
          <div className="container__comment-fb" style={{
            left: `${state.windowComment.x}px`,
            top: `${state.windowComment.y}px`,
          }}
          >
            <div ref={circleRef} className="circle-fb">1</div>
            <div style={styles.popper} {...attributes.popper} ref={popperRef} className="block__comment">
              <div className="block__comment-top">
                <h2 className="block__comment-top__text">Comment</h2>
                <Plus onClick={closeComment} className="block__comment-top__close" width={12} height={12}/>
              </div>
              <textarea onChange={changeHeight} className="block__comment-textarea" placeholder="Leave a comment" rows="2"/>
              <div className="block__comment-bottom">
                <button>Add Comment</button>
              </div>
            </div>
          </div>, document.body
        )
      )}
    </>
  );
}

export default FeedbackWidgetHook
