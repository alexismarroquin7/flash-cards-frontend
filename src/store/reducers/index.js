import { combineReducers } from "redux";
import { authReducer } from "./auth-reducer";
import { deckReducer } from "./deck-reducer";
import { cardReducer } from "./card-reducer";


export const rootReducer = combineReducers({
  auth: authReducer,
  deck: deckReducer,
  card: cardReducer
});