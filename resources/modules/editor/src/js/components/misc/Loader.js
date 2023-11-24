
const Loader = (
  {
    style = {},
    onClick = _defaultClick,
  }
) => {


  return <div style={style} onClick={onClick} className="altrp-loader">
    <div role="progressbar" className="bp3-spinner">
      <div className="bp3-spinner-animation">
        <svg width="25" height="25" strokeWidth="16.00"
             viewBox="-3.00 -3.00 106.00 106.00">
          <path className="bp3-spinner-track"
                                                   d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"></path><path
          className="bp3-spinner-head" d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" pathLength="280"
          strokeDasharray="280 280" strokeDashoffset="210"></path></svg>
      </div>

    </div>
  </div>
}

export default Loader

const _defaultClick = e => {
  e.stopPropagation()
  e.preventDefault()
}
