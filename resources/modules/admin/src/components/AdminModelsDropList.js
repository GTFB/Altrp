import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";

class AdminModelsDropList extends React.Component {

    render() {
        const {pathname} = this.props.location
        const pathmanHaveAsssets = pathname.indexOf('databases') !== -1 || pathname.indexOf('database') !== -1
        const {modelsState} = this.props;

        return (
            <>
                {
                    this.props.menu ? (
                        modelsState ? (
                            <ul style={{marginBottom: 80}}
                                className={pathmanHaveAsssets ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist models-sublist__item "}>
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
                                                    pathname: `/admin/database/${id}`,
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
                            <ul style={{marginBottom: 80}}
                                className={pathmanHaveAsssets ? "admin-nav-list admin-nav-list--sublist_active"
                                    : (this.props.models.filter(item => !this.props.standardModels.some(model => model.label === item.label)).length > 0 ? "admin-nav-list admin-nav-list--sublist models-sublist__item" : "admin-nav-list admin-nav-list--sublist_noItem")}>

                                {
                                    this.props.models
                                        .sort((a, b) => {
                                            if (a.label.toUpperCase() < b.label.toUpperCase())
                                                return -1;
                                            if (a.label.toUpperCase() > b.label.toUpperCase())
                                                return 1;
                                            return 0;
                                        }).filter(item => !this.props.standardModels.some(model => model.label === item.label))
                                        .map(({value: id, label}) => (
                                            <li key={id}>
                                                <Link
                                                    to={{
                                                        pathname: `/admin/database/${id}`,
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
                    ) : (
                        modelsState ? (
                            <ul style={{marginBottom: 80}}
                                className="admin-nav-list admin-nav-list--sublist models-sublist__item ">
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
                                                    pathname: `/admin/database/${id}`,
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
                            <ul style={{marginBottom: 80}}
                                className={pathmanHaveAsssets ? "admin-nav-list admin-nav-list--sublist models-sublist__item"
                                    : (this.props.models.filter(item => !this.props.standardModels.some(model => model.label === item.label)).length > 0 ? "admin-nav-list admin-nav-list--sublist models-sublist__item" : "admin-nav-list admin-nav-list--sublist_noItem")}>
                                {
                                    this.props.models
                                        .sort((a, b) => {
                                            if (a.label.toUpperCase() < b.label.toUpperCase())
                                                return -1;
                                            if (a.label.toUpperCase() > b.label.toUpperCase())
                                                return 1;
                                            return 0;
                                        }).filter(item => !this.props.standardModels.some(model => model.label === item.label))
                                        .map(({value: id, label}) => (
                                            <li key={id}>
                                                <Link
                                                    to={{
                                                        pathname: `/admin/database/${id}`,
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
                    )
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modelsState: state.modelsState.toggleModels,
        standardModels: state.modelsState.standardModels
    }
}

export const WithRouterAdminModelsDropList = compose(
    connect(mapStateToProps),
    withRouter
)(AdminModelsDropList);
