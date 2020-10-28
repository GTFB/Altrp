import React, { Component } from "react";
import Tour from 'reactour';


class AltrpTour extends Component {

      constructor(props) {
            super(props);

            this.state = {
                  isTourOpen: props.show,
                  steps: props.steps
            };
      }

      setIsTourOpen(value) {
            this.setState(s => ({ ...s, isTourOpen: value }));
      }

      render() {
            return (
                  <>
                        <Tour
                              steps={this.state.steps}
                              isOpen={this.state.isTourOpen}
                              onRequestClose={() => this.setIsTourOpen(false)}
                        />
                  </>
            );
      }
}

const steps = [
      {
            selector: '.altrp-element_ncml8z2tn',
            content: 'This is my first Step',
      },
];
export default AltrpTour;