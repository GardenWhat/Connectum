import {userData} from "./reducers/User";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const rootReducer = combineReducers({userData});
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootStoreState = ReturnType<typeof rootReducer>; 

const initialState: RootStoreState = {
    userData: {
        isLoggedIn: false
    }
}; 

export const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));