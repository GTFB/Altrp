import {controllerMapStateToProps} from "../../decorators/controller";
import React, {Component} from "react";
import {connect} from "react-redux";
import controllerDecorate from "../../decorators/controller";
import store, {getCurrentElement} from "../../store/store";
import {changeWidthColumns} from "../../store/column-width/actions";

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
  backgroundColor: "#e6e9ec",
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
      currentActive: null,
      show: true,
      variants: [
        /**
         * Вариант для одной колонки
         */
        [
          {
            name: '100',
            value: '100',
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
            value: '50_50',
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
            value: '30_70',
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
            value: '25_75',
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
            value: '20_80',
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
            value: '15_85',
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
            value: '85_15',
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
            value: '80_20',
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
            value: '75_25',
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
            value: '70_30',
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
            value: '33_33_33',
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
            value: '50_25_25',
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
            value: '25_50_25',
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
            value: '25_25_50',
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
            value: '60_20_20',
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
            value: '20_60_20',
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
            value: '20_20_60',
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
            value: '70_15_15',
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
            value: '15_70_15',
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
            value: '15_15_70',
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

  /**
   * Функция, обрабатывающая клик по одной из структур для изменения ширины колонок
   * @param index
   */

  /**
   * На handleClick вызывать changeValue и передавать children length и меняешь
   * @param index
   */

  handleClick(index, keyindex) {
    this._changeValue(index);
    this.setState({
      currentActive: keyindex
    });
  }
  render() {
    if(this.state.show === false) {
      return '';
    }
    return <div className="altrp-control-structure" style={MainWrapper}>
      {
        this.state.variants[this.props.currentElement.children.length - 1]
        && this.state.variants[this.props.currentElement.children.length - 1].map((variant, keyindex) => {
          return <div className={this.state.currentActive === keyindex ? "altrp-control-structure-wrapper active" : "altrp-control-structure-wrapper"} style={StructureWrapper} key={keyindex} onClick={() => {this.handleClick(variant.value, keyindex)}}>
            <div className="altrp-control-structure-sizefield" style={Sizefield}>
              {
                variant.variants.map((section, sectionid) => {
                  return <div className="altrp-control-left-block" key={sectionid} style={{ ...Block , width: `${section.length}%`}} ></div>
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
export default connect(controllerMapStateToProps)(ColumnsWidthController);
