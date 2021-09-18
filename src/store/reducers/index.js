import { combineReducers } from "redux";
import { authReducer } from "./auth-reducer";
import { deckReducer } from "./deck-reducer";


export const rootReducer = combineReducers({
  auth: authReducer,
  deck: deckReducer
});