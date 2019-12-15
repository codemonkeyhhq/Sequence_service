import { combineReducers } from 'redux';
import sequenceReducer from './sequenceReducer';

export default combineReducers({
  add_sequence:sequenceReducer
});
