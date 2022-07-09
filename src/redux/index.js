import { combineReducers } from "redux";
import { productReducer } from "./reducers/product";
import { basketReducer } from "./reducers/basket";

const allReducers = combineReducers({
  // add reducers here
  allProducts: productReducer,
  basket: basketReducer,
});

export default allReducers;
