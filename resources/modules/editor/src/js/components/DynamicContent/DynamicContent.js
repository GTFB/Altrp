import React, {Component} from "react";
import './DynamicContent.scss';
import {Menu, Item, Separator} from "react-contexify";
import {connect} from "react-redux";

class DynamicContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [{
        modelName: 'Post',
        fields: [
          {
            type: 'text',
            fields: [
              {
                fieldName: 'id',
                title: 'ID',
              },
              {
                fieldName: 'title',
                title: 'Title',
              },
              {
                fieldName: 'authorName',
                title: 'Author Name',
              },
              {
                fieldName: 'authorId',
                title: 'Author ID',
              },
            ]
          },
          {
            type: 'number',
            fields: [
              {
                fieldName: 'id',
                title: 'ID',
              },
              {
                fieldName: 'authorId',
                title: 'Author ID',
              },
            ]
          },
        ],
      }
      ]
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    console.log(this.props);
    let menuGroups = [];

    return <div className="altrp-dynamic-content">
      <div className="altrp-menu">
        {
          this.state.models.map(model=>{
            let fields = [];
            model.fields.forEach(_f=>{
              if(_f.type === this.props.params.type){
                fields = _f.fields;
              }
            });
            return<div className="altrp-menu-group" key={model.modelName}>
              <div className="altrp-menu-group__title" key={model.modelName}>{model.title}</div>
              {fields.map(field=>(<div className="altrp__item" key={field.fieldName}>{field.title}</div>))}
            </div>
          })
        }
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.dynamicContentState,
  };
}

export default connect(mapStateToProps)(DynamicContent);
