const documentCheckEvents = (cb) => {

  const events = [
    'altrpe',
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
