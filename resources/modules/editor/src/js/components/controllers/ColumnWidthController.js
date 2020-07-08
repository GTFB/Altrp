import React, {Component} from "react";
import {connect} from "react-redux";
import controllerDecorate from "../../decorators/controller";

const MainWrapper = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%",
}

const StructureWrapper = {
  width: "110px",
  cursor: "pointer",
  flexBasis: "48%",
  marginBottom: "10px",
}

const Sizefield = {
  display: "flex",
  justifyContent: "center",
}

const Block = {
  maxWidth: "105px",
  height: "45px",
  backgroundColor: "#a4afb7",
  marginRight: "2px"
}

const PresetTitle = {
  color: "#a4afb7",
  textAlign: "center",
  fontSize: "11px",
  paddingTop: "5px",
}

class ColumnsWidthController extends Component {
  constructor(props) {
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null & this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true,
      variants: [
        /**
         * Вариант для одной колонки
         */
        [
          {
            name: '100',
            variants: [
              {
                title: '100',
                length: 100,
              }
            ]
          },
        ],
        /**
         * Вариант для двух колонок
         */
        [
          {
            name: '50, 50',
            variants: [
              {
                title: '50',
                length: 50,
              },
              {
                title: '50',
                length: 50,
              },
            ]
          },
          {
            name: '30, 70',
            variants: [
              {
                title: '30',
                length: 30,
              },
              {
                title: '70',
                length: 70
              },
            ]
          },
          {
            name: '25, 75',
            variants: [
              {
                title: '25',
                length: 25,
              },
              {
                title: '75',
                length: 75
              },
            ]
          },
          {
            name: '20, 80',
            variants: [
              {
                title: '20',
                length: 20,
              },
              {
                title: '80',
                length: 80
              },
            ]
          },
          {
            name: '15, 85',
            variants: [
              {
                title: '15',
                length: 15,
              },
              {
                title: '85',
                length: 85
              },
            ]
          },
          {
            name: '85, 15',
            variants: [
              {
                title: '85',
                length: 85,
              },
              {
                title: '15',
                length: 15
              },
            ]
          },
          {
            name: '80, 20',
            variants: [
              {
                title: '80',
                length: 80,
              },
              {
                title: '20',
                length: 20
              },
            ]
          },
          {
            name: '75, 25',
            variants: [
              {
                title: '75',
                length: 75,
              },
              {
                title: '25',
                length: 25
              },
            ]
          },
          {
            name: '70, 30',
            variants: [
              {
                title: '70',
                length: 70,
              },
              {
                title: '30',
                length: 30
              },
            ]
          },
        ],
        /**
         * Вариант для 3-х колонок
         */
        [
          {
            name: '33, 33, 33',
            variants: [
              {
                title: '33',
                length: 33,
              },
              {
                title: '33',
                length: 33
              },
              {
                title: '33',
                length: 33
              },
            ]
          },
          {
            name: '50, 25, 25',
            variants: [
              {
                title: '50',
                length: 50,
              },
              {
                title: '25',
                length: 25
              },
              {
                title: '25',
                length: 25
              },
            ]
          },
          {
            name: '25, 50, 25',
            variants: [
              {
                title: '25',
                length: 25,
              },
              {
                title: '50',
                length: 50
              },
              {
                title: '25',
                length: 25
              },
            ]
          },
          {
            name: '25, 25, 50',
            variants: [
              {
                title: '25',
                length: 25,
              },
              {
                title: '25',
                length: 25
              },
              {
                title: '50',
                length: 50
              },
            ]
          },
          {
            name: '60, 20, 20',
            variants: [
              {
                title: '60',
                length: 60,
              },
              {
                title: '20',
                length: 20
              },
              {
                title: '20',
                length: 20
              },
            ]
          },
          {
            name: '20, 60, 20',
            variants: [
              {
                title: '20',
                length: 20,
              },
              {
                title: '60',
                length: 60
              },
              {
                title: '20',
                length: 20
              },
            ]
          },
          {
            name: '20, 20, 60',
            variants: [
              {
                title: '20',
                length: 20,
              },
              {
                title: '20',
                length: 20
              },
              {
                title: '60',
                length: 60
              },
            ]
          },
          {
            name: '70, 15, 15',
            variants: [
              {
                title: '70',
                length: 70,
              },
              {
                title: '15',
                length: 15
              },
              {
                title: '15',
                length: 15
              },
            ]
          },
          {
            name: '15, 70, 15',
            variants: [
              {
                title: '15',
                length: 15,
              },
              {
                title: '70',
                length: 70
              },
              {
                title: '15',
                length: 15
              },
            ]
          },
          {
            name: '15, 15, 70',
            variants: [
              {
                title: '15',
                length: 15,
              },
              {
                title: '15',
                length: 15
              },
              {
                title: '70',
                length: 70
              },
            ]
          },
        ],
      ],
      children: []
    };
    controllerDecorate(this);
  }

  getDefaultValue(){
    return '';
  }

  render() {
    if(this.state.show === false) {
      return '';
    }

    return <div className="altrp-control-structure" style={MainWrapper}>
      {
        this.state.variants[this.props.currentElement.children.length - 1].map((variant) => {
          return <div className="altrp-control-structure-wrapper" style={StructureWrapper}>
            <div className="altrp-control-structure-sizefield" style={Sizefield}>
              {
                variant.variants.map((section) => {
                  return <div className="altrp-control-left-block" style={{...Block, width: `${section.length}%`}}></div>
                })
              }
            </div>
            <div className="altrp-control-structure-preset-title" style={PresetTitle}>{variant.name}</div>
          </div>
        })
      }
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(ColumnsWidthController);
