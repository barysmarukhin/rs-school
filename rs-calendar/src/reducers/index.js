import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {calendarNavigation} from './calendarNavigation';

export default combineReducers({
  routing: routerReducer,
  calendarNavigation
})
