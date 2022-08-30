import { combineReducers } from "redux";
import handleCart from "./handleCart";
import productReducer from "./productReducer";

const rootReducers = combineReducers({
  handleCart,
  productReducer,
});

export default rootReducers;
