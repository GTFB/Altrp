import React, { Component, Suspense } from "react";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";
import { customStyle } from "../../../../../../admin/src/components/dashboard/widgetTypes";
import ColorPickerForFragment from './ColorPickerForFragment';

const mapStateToProps = (state) => {
      return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
      return {
            editElementDispatch: data => dispatch(editElement(data))
      };
}

class ColorSettings extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  editElement: props.editElement,
                  data: []
            };
      }

      async componentWillMount() {
            await this.getData();
      }


      async getData() {
            let data = await (new DataAdapter()).adaptDataByPath(this.state.editElement.settings.source.path, this.state.editElement.settings.source.key, this.state.editElement.settings.source.data);
            if (_.keys(this.state.params).length > 0) {
                  data = await (new DataAdapter()).adaptDataByPath(this.state.editElement.settings.source.path, this.state.editElement.settings.source.key, this.state.editElement.settings.source.data, this.state.editElement.settings.params);
            }
            this.setState(s => ({ ...s, data: data }));
      }

      async componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevState.editElement, this.props.editElement)) {
                  this.setState(state => ({ ...state, editElement: this.props.editElement }));
                  await this.getData();
            }
      }

      render() {
            let source = this.state.editElement.settings.source;
            if (Object.keys(source).length === 0) {
                  return <div className="col-12">Нет данных </div>;
            }
            if (this.state.data.length === 0) {
                  return <div className="col-12">Нет данных </div>;
            }

            return (
                  <div className="col-12">
                        <div className="mb-3">Цвет диаграммы</div>
                        {this.state.data.map((item, index) => {
                              let currentColor = customStyle[index] || "#606060";
                              if (typeof this.state.editElement.settings.color !== 'undefined') {
                                    if (Object.keys(this.state.editElement.settings.color).length > 0) {
                                          let color = _.get(this.state.editElement.settings.color, item.key);
                                          currentColor = color;
                                    }
                                    else {
                                          currentColor = customStyle[index] || "#606060";
                                    }
                              }

                              return (
                                    <Form.Group key={index} className="d-flex justify-content-between">
                                          <ColorPickerForFragment index={index} keyData={item.key} color={currentColor} setColor={this.props.setDatakeyColor}></ColorPickerForFragment>
                                    </Form.Group>
                              )
                        })}
                  </div>
            );
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorSettings);