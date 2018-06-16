import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from "../reducers/loginReducer";
import matchesReducer from '../reducers/matchesReducer';

/////

export default createStore(combineReducers({loginReducer}, {matchesReducer}, applyMiddleware(thunk)),
				 		{});




