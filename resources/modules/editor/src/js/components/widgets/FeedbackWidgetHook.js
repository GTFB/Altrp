import Plus from "../../../svgs/plus.svg";
import {useEffect, useRef, useState} from "react";
import FeedbackWidgetHookComponent from "./FeedbackWidgetHookComponent";
const {isEditor} = window.altrpHelpers;


function FeedbackWidgetHook({settings, idWidget, classes}) {
  const [state, setState] = useState({
    active: false,
    windowComments: [],
    commentsId: 1,
    loadedRef: false
  })
  const containerRef = useRef(null)

  const isLoadedRef = () => {
    setState(state => ({
      ...state,
      loadedRef: true
    }))
  }

  const addComment = (e) => {
    let trackClass = false;

    e.path.forEach(item => {
        if (item.className === "block__comment") trackClass = true;
    })
    const path = e.path
    let a = path.includes(containerRef.current)
    if (!a && !trackClass && state.active) {
      setState(state => ({
        ...state,
        active: false,
        commentsId: state.commentsId + 1,
        windowComments: [...state.windowComments, {
          id: state.commentsId,
          x: e.pageX - 18,
          y: e.pageY - 18
        }]
      }))
      isLoadedRef()
    }
  }

  const deleteComment = (id) => {
    let filter = state.windowComments.filter(item => item.id !== id)
    setState(state => ({
      ...state,
      windowComments: filter
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



  return (
    <>
      <div ref={containerRef} className={settings.custom_position ? `${classes} feedback__container-сustom` : `${classes} feedback__container`}>
        <button onClick={toggleClick} className={`${classes} feedback__button${state.active ? "-active" : ""}`}>
          <Plus width={14} height={14}/>
          <span className={`${classes} feedback__text`}>{settings.frame_text_btn || "feedback"}</span>
        </button>
      </div>
      {state.windowComments.map(item => (
        <FeedbackWidgetHookComponent classes={classes} idWidget={idWidget} settings={settings} key={item.id} {...item} deleteComment={deleteComment}/>
      ))}
    </>
  );
}

export default FeedbackWidgetHook
