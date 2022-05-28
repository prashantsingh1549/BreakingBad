import {combineReducers, createStore} from 'redux';
import BadReducer from './Reducer/BadReducer';

const rootReducer = combineReducers({
  BadReducer: BadReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
