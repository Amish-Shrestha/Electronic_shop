import { ActionTypes } from "../contants/action-types";

const initialState = {
  basket: [],
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    case ActionTypes.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      console.warn(`index: ${index}`);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};
