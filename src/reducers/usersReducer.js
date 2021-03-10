// Default state at initialization is empty array.
// When inputted an action of type 'FETCH_USER'
// returns a new array object. Contents of new
// array are contents of old array and and added
// action.payload.
// Default case is to return old state object.
export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      return [...state, action.payload];
    default:
      return state;
  }
};
