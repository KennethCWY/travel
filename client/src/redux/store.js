import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tripReducer from './reducer';

export const store = createStore(tripReducer, composeWithDevTools(applyMiddleware(thunk)));

