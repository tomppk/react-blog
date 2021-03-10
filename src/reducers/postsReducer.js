// Commonly use switch() statements in reducers to handle
// all possible types of actions.
// switch() is similar to if statement that it checks
// input parameter (in this case action.type) and then
// has different cases what to do with each matched input.
// In the case where type === 'FETCH_POSTS' switch runs code
// for this case and returns action.payload.
// This reducer does not have other cases but reducers can
// check for many different cases.
// We also set default case if action.type does not match
// our other cases. Here state is not changed and we return
// original state object.
export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return state;
  }
};
