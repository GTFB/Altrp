import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";

class AdminModelsDropList extends React.Component {

  render() {
    const {pathname} = this.props.location
    const pathmanHaveAsssets = pathname.indexOf('models') !== -1 || pathname.indexOf('model') !== -1
    const {modelsState} = this.props;

    return (
      <>
        {
          modelsState ? (
            <ul
              className={pathmanHaveAsssets ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
              {this.props.models
                .sort((a, b) => {
                  if (a.label.toUpperCase() < b.label.toUpperCase())
                    return -1;
                  if (a.label.toUpperCase() > b.label.toUpperCase())
                    return 1;
                  return 0;
                })
                .map(({value: id, label}) => (
                  <li key={id}>
                    <Link
                      to={{
                        pathname: `/admin/model/${id}`,
                        propsSearch: label,
                      }}
                      className="admin-nav-list__link admin-nav-list__link--models"
                      onClick={this.props.activeButton}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <ul
              className={pathmanHaveAsssets ? "admin-nav-list admin-nav-list--sublist_active"
                : (this.props.models.filter(item => item.value >= 5).length > 0 ? "admin-nav-list admin-nav-list--sublist" : "admin-nav-list admin-nav-list--sublist_noItem" )}>
              {
                this.props.models
                  .sort((a, b) => {
                    if (a.label.toUpperCase() < b.label.toUpperCase())
                      return -1;
                    if (a.label.toUpperCase() > b.label.toUpperCase())
                      return 1;
                    return 0;
                  }).filter(item => item.value >= 5)
                  .map(({value: id, label}) => (
                    <li key={id}>
                      <Link
                        to={{
                          pathname: `/admin/model/${id}`,
                          propsSearch: label,
                        }}
                        className="admin-nav-list__link admin-nav-list__link--models"
                        onClick={this.props.activeButton}
                      >
                        {label}
                      </Link>
                    </li>
                  ))
              }
            </ul>
          )
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modelsState: state.modelsState.toggleModels
  }
}

export const WithRouterAdminModelsDropList = compose(
  connect(mapStateToProps),
  withRouter
)(AdminModelsDropList);
