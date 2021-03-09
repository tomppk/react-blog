import jsonPlaceholder from "../apis/jsonPlaceholder";

// Redux-thunk middleware enables action creators to return
// either an action object or a function. Redux-thunk is
// used with async action creators.
// Action creator itself cannot be async because:
// 1. React's Babel compiler will transform the code we
// write for browsers. It transforms async/await so that
// we will get the request object and not the response
// 2. Created action gets returned and passed to reducers
// immediately. So even if we used fetch the action object
// would be processed by reducers before we got a response
// back.
// For these reasons we use Redux-thunk middleware. Action
// creator returns a function that gets passed to middleware
// and then thunk middleware will invoke the function and
// we can manually use dispatch to pass it on. After running
// the function we will return an action object that again
// is run through middleware but redux thunk will just
// let action object pass. It is only concerned in functions
// Redux-thunk gets two Redux functions as arguments and
// we can use these in our function. dispatch() allows us
// to dispatch actions to to reducers and modify our Redux
// state data store. getState() allows us to read our Redux
// state data store.
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response });
};

// SAME AS ABOVE WRITTEN DIFFERENTLY:
// export const fetchPosts = () => {
//   return async function(dispatch, getState) {
//     const response = await jsonPlaceholder.get("/posts");

//     dispatch({
//       type: "FETCH_POSTS",
//       payload: response,
//     });
//   };
// };
