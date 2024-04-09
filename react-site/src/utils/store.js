import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {
  isAuthorized: false,
  isAdmin: false
};

const store = createStore(rootReducer, initialState);

export default store;
