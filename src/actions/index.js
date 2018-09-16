import { biddersRef } from "../config/firebase";
import { FETCH_BIDDERS } from "./types";

export const addBidder = newBidder => async dispatch => {
  biddersRef.push().set(newBidder);
};

export const removeBidder = removeBidderId => async dispatch => {
  biddersRef.child(removeBidderId).remove();
};

export const fetchBidders = () => async dispatch => {
  biddersRef.on("value", snapshot => {
    dispatch({
      type: FETCH_BIDDERS,
      payload: snapshot.val()
    });
  });
};