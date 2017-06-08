import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {calendarNavigation} from './calendarNavigation';
import {ajaxDataHandler} from './ajaxDataHandler';

export default combineReducers({
  routing: routerReducer,
  calendarNavigation,
  ajaxDataHandler
})
