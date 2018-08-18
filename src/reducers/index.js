import { combineReducers } from "redux";
import lists from "./list";

/* Here we can add reducers, as much as needed */
const rootReducer = combineReducers({ lists });

/* Export Reducer */
export default rootReducer;
