import { combineReducers } from "redux"
import { boardsReducer } from "./boardsReducer"

export const rootReducer = combineReducers({
   boards: boardsReducer
})