import React, {Component} from 'react';
import "./rotating.scss";
import {Motion, spring, TransitionMotion} from "react-motion/lib/react-motion";

class Rotating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      step: 0,
      index: 0,
      width: 0,
      widthRef: 0,
      style: {}
    };

    this.rotating = this.rotating.bind(this);
    this.typing = this.typing.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.setStep = this.setStep.bind(this);

    this.clipRef = React.createRef();
    this.flipRef = React.createRef();
    this.swirlRef = React.createRef();
  }

  componentDidMount() {
    this.rotating();

    if(this.clipRef.current && this.props.type === "clip") {
      this.setState({ width: this.clipRef.current.offsetWidth })
    }

    if(this.props.type === "flip") {
      this.getWidth();
      this.setState({ step: 1 })
    }

    if(this.props.type === "swirl") {
      this.setState({index: -1})
    }
  }

  componentDidUpdate(prevProps) {
    const update = () => {
      let saveWidth = false;

      if(this.props.type === "flip") {
        saveWidth = true
      }

      this.setState((state) => ({
        active: 0,
        index: 0,
        step: 0,
        width: saveWidth ? state.width : 0,
        style: {}
      }));

      if(this.props.type === "swirl") {
        console.log('tg')
        this.setState({index: -1})
      }

      this.getWidth();
      this.rotating();
    };

    if(prevProps.text !== this.props.text) {
      update()
    }

    if(prevProps.type !== this.props.type) {
      update()
    }
  }

  getWidth() {
    switch (this.props.type) {
      case "flip":
        if (this.flipRef.current) {
          if (this.flipRef.current.offsetWidth > this.state.width) {
            this.setState({width: this.flipRef.current.offsetWidth})
          }
        }
        break;
      case "swirl":
        if (this.swirlRef.current) {
          if (this.swirlRef.current.offsetWidth > this.state.width) {

            if(this.props.text.split("\n").length >= this.state.widthRef) {
              this.setState((state) => ({
                width: this.swirlRef.current.offsetWidth,
                widthRef:state.widthRef + 1
              }))
            }
          }
        }
        break;
    }
  }

  rotating() {
    const arrayText = this.props.text.split("\n");

    switch (this.props.type) {
      case "typing":
        setTimeout(() => {
          const length = arrayText[this.state.index].split("").length;
          this.setState((state) => ({ step: 1, active: (length >= state.active + 1) ? state.active : 0 }));
          setTimeout(() => {
            const indexMax = arrayText.length--;
            this.setState((state) => {
              return ({ step: 2, index: indexMax > state.index+1 ? state.index+1 : 0 })
            });
            setTimeout(this.typing, 500)
          }, 500)
        }, 2000);
        break;
      case "clip":
        if(this.clipRef.current) {
          const length = arrayText.length;

          setTimeout(() => {
            const clipWidth = setInterval(() => {
              if (this.state.width > 0) {
                this.setState((state) => ({ width: state.width-4 }));
              } else {

                clearInterval(clipWidth);

                setTimeout(() => {
                  this.setState((state) => ({ width: 0, active: (length > state.active+1 ? state.active+1 : 0) }));
                  const clipWidthShow = setInterval(() => {
                    const maxWidth = this.props.type === "clip" ? this.clipRef.current.offsetWidth >= this.state.width : false;

                    if(maxWidth) {
                      this.setState((state) => ({ width: state.width+4 }))
                    } else {
                      if(this.props.type === "clip") {
                        this.setState({ width: this.clipRef.current.offsetWidth });
                      }
                      clearInterval(clipWidthShow);
                      this.rotating();
                    }
                  }, 20)
                }, 100)
              }

            }, 20)
          }, 4000)
        }
        break;
      case "flip":
        this.getWidth();

        setTimeout(() => {
          this.setState({step: 0});
          setTimeout(() => {
            const length = arrayText.length;
            this.setState((state) => {
              return {
                active: (length > state.active+1 ? state.active+1 : 0),
                step: 1
              }
            });

            this.rotating()
            }, 1500);
          }, 3000);
        break;
      case "swirl":
        this.getWidth();

        if(_.isString(arrayText[this.state.active+1])) {
          const wordNext = arrayText[this.state.active+1].split("").length;
          const wordPrev = arrayText[this.state.active].split("").length;

          this.setState({
            step: wordNext > wordPrev ? wordNext : wordPrev
          });
        }

        setTimeout(() => {

          const letterChanging = setInterval(() => {
            if(this.state.index < this.state.step) {
              this.setState((state) => ({index: state.index+1}))
            } else {
              clearInterval(letterChanging);
              setTimeout(() => {
                const length = arrayText.length > this.state.active+1;
                this.setState((state) => ({ active: length ? state.active+1 : 0, index: -1 }));
                this.rotating();
              }, 500)
            }
          }, 100)
        }, 1000);

        break;
    }
  }

  typing() {
    const length = this.props.text.split("\n")[this.state.index].split("").length;
    setTimeout(() => {
      if(length >= this.state.active + 1) {
        this.setState((state) => ({ active: state.active+1 }));
        this.typing()
      } else {
        this.rotating()
      }
    }, 150);
  }

  setStep(value) {
    console.log(value)
    this.setState({ step: value })
  };

  render() {
    let classes = [(this.props.prefix ? "altrp-" + this.props.prefix + "-animating-rotating" : " "), "altrp-animating-rotating"];
    const textArray = this.props.text.split("\n");
    let text = textArray[this.state.index];
    let styles = {};

    switch (this.props.type) {
      case "typing":
        classes.push("altrp-animating-rotating-line");
        classes.push("altrp-animating-rotating-line-pulse");

        if(this.state.step === 1) {
          classes.push("altrp-animating-rotating-typing-delete");
        } else {
          const letters = textArray[this.state.index].split("");

          text = letters.map((letter, idx) => {
            let hide = idx >= this.state.active && this.state.step >= 2 ? "altrp-animating-rotating-typing-letter-hide" : "";

            const classNames = ["altrp-animating-rotating-typing-letter",
              hide
            ];
            return (
              <span key={idx} className={_.join(classNames, " ")}>
                {
                  letter
                }
              </span>
            )
          });
        }
        break;
      case "clip":
        let stylesClip = {
          width: this.state.width,
          overflow: "hidden"
        };

        text = (
          <React.Fragment>
            <div style={stylesClip}>
              {
                textArray.map((word, idx) => {
                  const classNames = "altrp-animating-rotating-clip-word" +
                    (this.state.active !== idx ? " altrp-animating-rotating-clip-hide" : "");

                  return (
                    <span
                      ref={(this.state.active !== idx ? null : this.clipRef)} key={idx}
                      className={classNames}>
                      {
                        word
                      }
                    </span>
                  )
                })
              }
            </div>
            <span className="altrp-animating-rotating-clip-line" />
          </React.Fragment>
        );
        break;
      case "flip":

        classes.push("altrp-animating-rotating-flip-container");

        let animationTransform = "altrp-animating-rotating-flip-container-showing";
        if(this.state.step === 0) {
          animationTransform = "altrp-animating-rotating-flip-container-hiding"
        } else if(this.state.step === 1) {
          animationTransform = "altrp-animating-rotating-flip-container-showing"
        }
        classes.push(animationTransform);

        styles = {
          ...styles,
          transform: `rotateX(${this.state.style.transform}deg)`
        };
        text = (
          <div
            style={{
              width: this.state.width
            }}
          >
            {
              textArray.map((word, idx) => {
                const classNames = "altrp-animating-rotating-flip-word" +
                  (this.state.active !== idx ? " altrp-animating-rotating-flip-hide" : " altrp-animating-rotating-flip-show");

                return (
                  this.state.active !== idx ? null :
                    <span
                      ref={(this.state.active !== idx ? null : this.flipRef)}
                      key={idx}
                      className={classNames}
                    >
                      <span>
                        {
                          word
                        }
                      </span>
                    </span>
                )
              })
            }
          </div>
        );
        break;
      case "swirl":
        text = (
          <div
            style={{
              width: this.state.width
            }}
            className="altrp-animating-rotating-swirl"
          >
            {
              textArray.map((word, idx) => {
                const classNames = "altrp-animating-rotating-swirl-word";

                return (
                  <span key={idx} ref={this.state.widthRef === idx ? this.swirlRef : null} className={classNames}>
                {
                  word.split("").map((letter, idxL) => {
                    let classNames = "altrp-animating-rotating-swirl-letter";
                  // || this.state.acitve === idx && word.split("").length
                    if(this.state.active !== idx) {
                      classNames += " altrp-animating-rotating-swirl-letter-hide"
                    }

                    if(this.state.active + 1 === idx) {
                      if(idxL <= this.state.index) {
                        classNames += " altrp-animating-rotating-swirl-letter-showing"
                      }
                    }

                    if(this.state.active === idx && idxL <= this.state.index) {
                      classNames += " altrp-animating-rotating-swirl-letter-hiding"
                    }

                    return (
                      <div key={idxL} className={classNames}>
                        {
                          letter
                        }
                      </div>
                    )
                  })
                }
              </span>
                )
              })
            }
          </div>
        )
        break;
    }

    let content = (
      <span
        className={_.join(classes, " ")}
        style={styles}
      >
        {
          text
        }
      </span>
    );

    return content

    // return <AnimationEngine from={{
    //   width: 0
    // }}>
    //   <div>
    //     help
    //   </div>
    // </AnimationEngine>
  }
}

export default Rotating;
