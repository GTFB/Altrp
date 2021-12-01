import React, {Component} from "react";
import {connect} from "react-redux";
import DefaultLogo from '../svgs/admin__logo.svg'
import DefaultLogoMini from '../svgs/admin-logo-mini.svg'
import {renderAsset} from "../../../front-app/src/js/helpers";

class AdminLogo extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <>
        {this.props.menu ? (
          <a href='/' target="_blank" className="admin__logo">{this.props.adminLogo.assetType
            ? renderAsset(this.props.adminLogo)
            : <DefaultLogo />}
          </a>
        ) : (
          <a href='/' target="_blank" className="admin__logo">{this.props.adminLogo.assetType
            ? renderAsset(this.props.adminLogo)
            : <DefaultLogoMini />}
          </a>
        )}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    adminLogo: state.adminLogo
  };
}

export default connect(mapStateToProps)(AdminLogo);
