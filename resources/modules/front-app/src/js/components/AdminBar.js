import React from 'react';
import { connect } from 'react-redux';

class AdminBar extends React.Component {
  componentDidMount() {
    console.log(this.props.state.currentUser.hasRoles());
    console.log(this.props.state)
  }
  render() {
    return null;
    return (
      <div>
        admin bar
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps)(AdminBar);