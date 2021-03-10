import _ from "lodash"; // lodash imported as underscore
import jsonPlaceholder from "../apis/jsonPlaceholder";

// When we call action creator from inside an action creator
// we need to make sure we dispatch() the result of that
// nested action creator.
// Also we need to make sure to await the result of inner
// action creator to resolve before dispatching it.
// Second argument redux-thunk calls our inner functions
// with is getState function which retrieves the state of
// our Redux store.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // Using lodash uniq and map function.
  // _.map iterates over posts array and creates new array
  // with only userId's. As there are 100 posts the array
  // will be 100 elements long with duplicate id's.
  // To return only unique values we use ._uniq.
  // We will get an array of 10 unique userId's
  // const userIds = _.uniq(_.map(getState().posts, "userId"));

  // For each userId call fetchUser action creator and
  // then dispatch() the result of that action creator
  // function.
  // async/await does not work with forEach().
  // To use await we might do something like this:
  // await Promise.all(userIds.map(id => dispatch(fetchUser(id))))
  // But we do not need to use await here as there is
  // no code after this line. Using await makes Javascript
  // wait for the code line's request etc. to finish before
  // moving on to the next line of code. Here there is no
  // next line so we do not need to wait for the result to
  // arrive before moving on.
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  // REFACTOR. THIS .chain() IS SAME AS userIds above.
  // lodash function to allow you to chain on functions
  // similar to Java stream functionality. Each following
  // method gets previous method's result as input.
  // Needs to end in .value() for the whole chain to be
  // executed.
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

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

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// SAME AS ABOVE WRITTEN DIFFERENTLY:
// export const fetchPosts = function() {
//   return async function(dispatch, getState) {
//     const response = await jsonPlaceholder.get("/posts");

//     dispatch({
//       type: "FETCH_POSTS",
//       payload: response,
//     });
//   };
// };

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

// MEMOIZED VERSION OF fetchUser()
// Named export so other components can import only
// functions they need.
// Action creator takes is input parameter user id and
// returns an async function that give to thunk
// middleware for execution.
// Function fetchUser(id) returns function(dispatch)
// which calls function _fetchuser(id, dispatch)
// which makes a fetch request to outside api and
// calls dispatch() to send action to reducers which
// will process received action and update our Redux
// state store which will cause our Reach components to
// re-render.
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

// Underscore in front of function means it is a private
// function and should not be called outside this specific
// purpose.
// lodash library's memoize() method will only allow to
// call a function with a unique argument one time. Second
// time calling with the same argument will return the
// previous call's value. So no new fetch request is made,
// just the previous received value returned.
// This function returns action object with fetched data.

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
