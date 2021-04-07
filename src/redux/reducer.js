import * as actions from "./actions";

const initState = {};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GREET:
      return state;

    default:
      return state;
  }
};

export default rootReducer;
