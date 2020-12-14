import React, {Component} from 'react';
import "./rotating.scss";

class Rotating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      step: 0,
      index: 0,
      width: 0,
    };

    this.rotating = this.rotating.bind(this);
    this.typing = this.typing.bind(this);

    this.clipRef = React.createRef()
  }

  componentDidMount() {
    this.rotating();

    if(this.clipRef.current && this.props.type === "clip") {
      this.setState({ width: this.clipRef.current.offsetWidth })
    }
  }

  rotating() {
    switch (this.props.type) {
      case "typing":
        const length = this.props.text.split("\n")[this.state.index].split("").length;
        setTimeout(() => {
          this.setState((state) => ({ step: 1, active: (length >= state.active + 1) ? state.active : 0 }));
          setTimeout(() => {
            const indexMax = this.props.text.split("\n").length--;
            this.setState((state) => {
              return ({ step: 2, index: indexMax > state.index+1 ? state.index+1 : 0 })
            });
            setTimeout(this.typing, 500)
          }, 500)
        }, 2000);
        break;
      case "clip":
        if(this.clipRef.current) {
          const length = this.props.text.split("\n").length;

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

  componentDidUpdate(prevProps) {
    if(prevProps.text !== this.props.text) {
      this.setState({ active: 0, index: 0, step: 0, width: 0 });
      this.rotating()
    }

    if(prevProps.type !== this.props.type) {
      this.setState({ active: 0, index: 0, step: 0, width: 0 });
      this.rotating();
    }
  }

  render() {
    let classes = [(this.props.prefix ? "altrp-" + this.props.prefix + "-animating-rotating" : " "), "altrp-animating-rotating"];
    const textArray = this.props.text.split("\n");
    let text = textArray[this.state.index];

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
        let styles = {
          width: this.state.width,
          overflow: "hidden"
        };

        text = (
          <React.Fragment>
            <div style={styles}>
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

        text = (
          textArray.map((word, idx) => {
            const classNames = "altrp-animating-rotating-flip-word" +
              (this.state.active !== idx ? " altrp-animating-rotating-flip-hide" : " altrp-animating-rotating-flip-show");

            return (
              <span
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
        );
        break
    }
    return (
      <span className={_.join(classes, " ")}>
        {
          text
        }
      </span>
    );
  }
}

export default Rotating;
