import React from "react";
import { connect } from "react-redux";

// UserHeader gets passed userId property from parent
// element PostLists that gets it from fetched posts
// data
class UserHeader extends React.Component {
  render() {
    // this.props.user is passed as property from
    // mapStateToProps that takes in our Redux state
    // store object users and finds one specific user
    // determined by userId property passed to component
    // from parent PostLists by accessing this property
    // with ownProps.
    // If our state.users array is empty (no users yet
    // at initialization) then return null and not render
    // anything.
    const { user } = this.props;

    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>;
  }
}
// Instead of passing our UserHeader component whole
// list of users we will insert logic inside
// mapStateToProps to find and filter only to user
// data our component needs.
// mapStateToProps has access to Redux store state and
// to component props. It can use ownProps to access
// UserHeader props passed in from parent.
// Find() array method iterates over the array of users
// that UserHeader receives from our Redux state store.
// For each array element find() runs function to check
// if array element user.id property is equal to userId
// that was passed to UserHeader property from parent
// element PostLists.
// If it is equal then return user object from our
// state.users array that matches the userId of blog
// post that parent PostLists is iterating over
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

// User React-Redux library's connect() method to give
// component access to Redux store state and action
// creator functions
export default connect(mapStateToProps)(UserHeader);
