const documentCheckEvents = (cb) => {

  const events = [
    "click",
    "mouseenter",
    "mouseover",
    "mouseleave",
    "touch",
    "scroll",
    "resize"
  ]

  const eventFunction = () => {
    cb()

    events.forEach((name) => {
      document.removeEventListener(name, eventFunction)
    })
  }

  events.forEach((name) => {
    document.addEventListener(name, eventFunction)
  })
}

export default documentCheckEvents
