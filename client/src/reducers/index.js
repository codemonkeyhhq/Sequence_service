import { combineReducers } from 'redux';
import addReducer from './addReducer';
import viewReducer from './viewReducer';
import siteReducer from './siteReducer';
import panelReducer from './panelReducer';

export default combineReducers({
  add_result: addReducer,
  issue_list: viewReducer,
  site_list: siteReducer,
  panel_list:panelReducer
});
