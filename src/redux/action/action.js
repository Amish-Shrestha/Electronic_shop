import { ActionTypes } from "../contants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_Products,
    payload: products,
  };
};

export const setBasket = (basket) => {
  return {
    type: ActionTypes.ADD_TO_BASKET,
    payload: basket,
  };
};

export const removeFromBasket = (id) => {
  return {
    type: ActionTypes.REMOVE_FROM_BASKET,
    id: id,
  };
}
