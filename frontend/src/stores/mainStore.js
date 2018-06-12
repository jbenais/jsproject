import {createStore, combineReducers, applyMiddleware} from 'redux';
import loginReducer from "../reducers/loginReducer";

/////

export default createStore(combineReducers({loginReducer}),
				 		{});




