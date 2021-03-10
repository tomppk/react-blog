// Reducer must not mutate original state and then return
// the original state object. Always return new state object
// Redux checks changes for state by comparing whether
// the returned state object is reference to exactly same
// state object or reference to some new state object.
// If the returned state object refers to the original
// object no matter how the contents of that object have
// changed Redux will say that the object reference is the
// same and no change has occurred and no need to tell
// React to re-render any components as state object has
// not changed.

// Safe State Updates in Reducers
// Arrays:
// 1. Removing an element from an array
// Bad - state.pop()
// Good! - state.filter(element => element !== "hi")
// 2. Adding an element to an array
// Bad - state.push("hi")
// Good! - [...state, "hi"]
// 3. Replacing an element in an array
// Bad - state[0] = "hi"
// Good! - state.map(el => el === "hi" ? "bye" : el)

// Objects:
// 1. Updating a property in an object
// Bad - state.name = "Sam"
// Good! - {...state, name: "Sam"}
// 2. Adding a property to an object
// Bad - state.age = 30
// Good! - {...state, age: 30}
// 3. Removing a property from an object
// Bad - delete state.name
// Good! - {...state, age: undefined}
// _.omit(state, "age")

import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
});
