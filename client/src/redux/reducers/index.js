import { combineReducers } from 'redux';
import control from './control';
import data from './data';
import session from './session';

const reducer = combineReducers({
  control,
  session,
  data
});

export default reducer;