import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./reducers/homeSlice";
 
const rootReducer = combineReducers({
  home:homeReducer
});

export default rootReducer;
