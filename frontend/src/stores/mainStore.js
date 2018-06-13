import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from "../reducers/loginReducer";

/////

export default createStore(combineReducers({loginReducer}, applyMiddleware(thunk)),
				 		{});




