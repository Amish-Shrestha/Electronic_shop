import { ActionTypes } from "../contants/action-types";

const initialState = {
  products: [],
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_Products:
      return { ...state, products: payload };
    default:
      return state;
  }
};
