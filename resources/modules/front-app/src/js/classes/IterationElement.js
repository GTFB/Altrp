import mbParseJSON from "../functions/mb-parse-JSON";
import $ from 'jquery'

/**
 * @class IterationElement
 */

class IterationElement {
  constructor(element) {
    this.element = element
    this.settings = mbParseJSON(element.dataset.altrpSettings, {})
    this.setElementInViewportObserver();
    this.oldMousePosition = {};
    if(this.settings?.perspective){
      this.element.style.setProperty('perspective', '1200px')
    }
  }

  onInsideViewport = () => {
    this.run();
    this.animationFrameRequest = requestAnimationFrame(this.onInsideViewport);
  }

  run = () => {
    const mousePosition = altrp.mousePosition,
      oldMousePosition = this.oldMousePosition;
    const scrollPosition = window?.appStore?.getState()?.scrollPosition,
      oldScrollPosition = this.oldScrollPosition;

    if (oldMousePosition.x === mousePosition?.x && oldMousePosition.y === mousePosition?.y && scrollPosition?.top === oldScrollPosition?.top) {
      return;
    }
    if(scrollPosition?.top !== oldScrollPosition?.top){
      this.runScrollCallback()
      this.oldScrollPosition = {...scrollPosition};
    }

    this.oldMousePosition = {
      x: mousePosition?.x,
      y: mousePosition?.y
    };
    const passedPercentsX = 100 / innerWidth * mousePosition?.x,
      passedPercentsY = 100 / innerHeight * mousePosition?.y;
    this.runMouseCallback(passedPercentsX, passedPercentsY);

    let value = `${
      this.translateY ? `translateY(${this.translateY})` : ''
    }${
      this.translateX ? `translateX(${this.translateX})` : ''
    }${
      this.rotateX ? `rotateX(${this.rotateX})` : ''
    }${
      this.rotateY ? `rotateY(${this.rotateY})` : ''
    }${
      this.rotateZ ? `rotateZ(${this.rotateZ})` : ''
    }${
      this.scale ? `scale(${this.scale})` : ''
    }`

    const target = this.element.querySelector('.altrp-element > *:not(.overlay, .altrp-skeleton-box)')
    target.style.setProperty('transform', value)
    this.opacity && target.style.setProperty('opacity', this.opacity)
    this.blur && target.style.setProperty('filter', `blur(${this.blur})`)

    let xAnchor = this.settings['scroll-effects:y-anchor']
    let yAnchor = this.settings['scroll-effects:x-anchor']
    if(yAnchor || xAnchor){
      yAnchor = yAnchor || 'center'
      xAnchor = xAnchor || 'center'
      target.style.setProperty('transform-origin', `${xAnchor} ${yAnchor}`)
    }
  }

  runScrollCallback() {
    let passedRangePercents = IterationElement.getElementViewportPercentage($(this.element))

    if(this.settings['scroll-effects:vertical']){
      const vertical = this.settings['scroll-effects:vertical']
      let _passedRangePercents = passedRangePercents
      if(vertical['viewport-bottom']?.size > _passedRangePercents){
        _passedRangePercents = vertical['viewport-bottom']?.size || 0
      }

      if(vertical['viewport-top']?.size < _passedRangePercents){
        _passedRangePercents = vertical['viewport-top']?.size || 0
      }

      if(vertical.direction === 'up'){
        _passedRangePercents = 50 - _passedRangePercents
      } else {
        _passedRangePercents = _passedRangePercents - 50
      }
      this.translateY = (vertical?.speed?.size || 4) * _passedRangePercents + 'px'
    }

    if(this.settings['scroll-effects:horizontal']){
      const horizontal = this.settings['scroll-effects:horizontal']
      let _passedRangePercents = passedRangePercents
      if(horizontal['viewport-bottom']?.size > _passedRangePercents){
        _passedRangePercents = horizontal['viewport-bottom']?.size || 0
      }

      if(horizontal['viewport-top']?.size < _passedRangePercents){
        _passedRangePercents = horizontal['viewport-top']?.size || 0
      }

      if(horizontal.direction === 'to-right'){
        _passedRangePercents = 50 - _passedRangePercents
      } else {
        _passedRangePercents = _passedRangePercents - 50
      }
      this.translateX = (horizontal?.speed?.size || 4) * _passedRangePercents + 'px'
    }

    if(this.settings['scroll-effects:rotate']){
      const rotate = this.settings['scroll-effects:rotate']
      let _passedRangePercents = passedRangePercents
      if(rotate['viewport-bottom']?.size > _passedRangePercents){
        _passedRangePercents = rotate['viewport-bottom']?.size || 0
      }

      if(rotate['viewport-top']?.size < _passedRangePercents){
        _passedRangePercents = rotate['viewport-top']?.size || 0
      }

      if(rotate.direction === 'to-left'){
        _passedRangePercents = 50 - _passedRangePercents
      } else {
        _passedRangePercents = _passedRangePercents - 50
      }
      this.rotateZ = (rotate?.level?.size || 1) * _passedRangePercents + 'deg'
    }

    if(this.settings['scroll-effects:transparency']){
      const transparency  = this.settings['scroll-effects:transparency']

      const movePoint = this.getDirectionMovePoint(passedRangePercents, transparency.direction,
        {
          start: transparency['viewport-bottom']?.size||0,
          end: transparency['viewport-top']?.size || 0
        }),
        level = transparency?.level?.size / 10;
      this.opacity = 1 - level + this.getEffectValueFromMovePoint(level, movePoint);
    }

    if(this.settings['scroll-effects:blur']){
      const blur  = this.settings['scroll-effects:blur']

      const movePoint = this.getDirectionMovePoint(passedRangePercents, blur.direction,
      {
          start: blur['viewport-bottom']?.size||0,
          end: blur['viewport-top']?.size || 0
      })
      this.blur = (blur?.level?.size - this.getEffectValueFromMovePoint(blur?.level?.size, movePoint)) + 'px';
    }

    if(this.settings['scroll-effects:scale']){
      const scale  = this.settings['scroll-effects:scale']
      const movePoint = this.getDirectionMovePoint(passedRangePercents, scale.direction,

        {
          start: scale['viewport-bottom']?.size||0,
          end: scale['viewport-top']?.size || 0
        });
      this.scale = 1 + (scale.level?.size || 4) * movePoint / 1000;
    }

  }

  getEffectValueFromMovePoint(range, movePoint) {
    return range * movePoint / 100;
  }

  getDirectionMovePoint(passedPercents, direction, range) {
    let movePoint;

    if (passedPercents < range.start) {
      if ('out-in' === direction) {
        movePoint = 0;
      } else if ('in-out' === direction) {
        movePoint = 100;
      } else {
        movePoint = this.getMovePointFromPassedPercents(range.start, passedPercents);

        if ('in-out-in' === direction) {
          movePoint = 100 - movePoint;
        }
      }
    } else if (passedPercents < range.end) {
      if ('in-out-in' === direction) {
        movePoint = 0;
      } else if ('out-in-out' === direction) {
        movePoint = 100;
      } else {
        movePoint = this.getMovePointFromPassedPercents(range.end - range.start, passedPercents - range.start);

        if ('in-out' === direction) {
          movePoint = 100 - movePoint;
        }
      }
    } else if ('in-out' === direction) {
      movePoint = 0;
    } else if ('out-in' === direction) {
      movePoint = 100;
    } else {
      movePoint = this.getMovePointFromPassedPercents(100 - range.end, 100 - passedPercents);

      if ('in-out-in' === direction) {
        movePoint = 100 - movePoint;
      }
    }

    return movePoint;
  }


  getMovePointFromPassedPercents(movableRange, passedPercents) {
    const movePoint = passedPercents / movableRange * 100;
    return +movePoint.toFixed(2);
  }

  concatTransformMotionEffectCSSProperties(ruleName) {
    let value = '';
    $.each(this.rulesVariables[ruleName], variableKey => {
      value += `${variableKey}(var(--${variableKey}))`;
    });
    return value;
  }

  runMouseCallback(passedPercentsX, passedPercentsY) {
    if (this.settings['mouse-effects:track']) {
      const speed = this.settings['mouse-effects:track']?.speed?.size || 1;
      const direction = this.settings['mouse-effects:track'].direction || 'opposite';
      this.translateX = direction === 'opposite' ? (50 - passedPercentsX) * speed + 'px' : (passedPercentsX - 50) * speed + 'px'
      this.translateY = direction === 'opposite' ? (50 - passedPercentsY) * speed + 'px' : (passedPercentsY - 50) * speed + 'px'

    }
    if (this.settings['mouse-effects:tilt']) {
      let speed = this.settings['mouse-effects:tilt']?.speed?.size || 1;
      speed = speed / 10
      const direction = this.settings['mouse-effects:tilt'].direction || 'opposite';
      let _passedPercentsX = direction === 'opposite' ? (50 - passedPercentsX) * speed + 'deg' : (passedPercentsX - 50) * speed + 'deg'
      let _passedPercentsY = direction === 'opposite' ? (passedPercentsY - 50) * speed + 'deg' : (50 - passedPercentsY) * speed + 'deg'
      this.rotateX =  _passedPercentsY
      this.rotateY =  _passedPercentsX
    }

  }

  setElementInViewportObserver() {
    this.intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.onInsideViewport();
      } else {
        this.removeAnimationFrameRequest();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: [0]
    });
    this.intersectionObserver.observe(this.element);
  }

  removeAnimationFrameRequest() {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
  }

  static getElementViewportPercentage($element) {
    let offsetObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const elementOffset = $element[0].getBoundingClientRect(),
      offsetStart = offsetObj.start || 0,
      offsetEnd = offsetObj.end || 0,
      windowStartOffset = window.innerHeight * offsetStart / 100,
      windowEndOffset = window.innerHeight * offsetEnd / 100,
      y1 = elementOffset.top - window.innerHeight,
      y2 = elementOffset.top + windowStartOffset + $element.height(),
      startPosition = 0 - y1 + windowStartOffset,
      endPosition = y2 - y1 + windowEndOffset,
      percent = Math.max(0, Math.min(startPosition / endPosition, 1));
    return parseFloat((percent * 100).toFixed(2));
  }
}

export default IterationElement
