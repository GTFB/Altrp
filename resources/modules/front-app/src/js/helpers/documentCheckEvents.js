const documentCheckEvents = (cb) => {

  const events = [
    'click',
    'dblclick',
    'mouseenter',
    'mousedown',
    'mouseout',
    'mouseup',
    'mousewheel',
    'mouseover',
    'mouseleave',
    'mousemove',
    'touch',
    'scroll',
    'altrpe',
    'resize'
  ]

  const eventFunction = () => {
    events.forEach((name) => {
      document.removeEventListener(name, eventFunction)
    })
    cb()
  }

  events.forEach((name) => {
    document.addEventListener(name, eventFunction)
  })
}

export default documentCheckEvents
