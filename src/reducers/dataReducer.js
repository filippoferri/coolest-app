import { FETCH_BIDDERS } from "../actions/types";

export default (state = "loading", action) => {
  switch (action.type) {
    case FETCH_BIDDERS:
      return action.payload;
    default:
      return state;
  }
};