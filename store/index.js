import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import requestReducer from './reducer/requestReducer';

const rootReducer = combineReducers({
  requestReducer,
});

const middleware = applyMiddleware(thunk);

export const store = legacy_createStore(rootReducer, middleware);
