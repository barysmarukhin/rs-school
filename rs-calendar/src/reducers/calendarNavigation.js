import { MOVE_NEXT, MOVE_PREV, CHANGE_VIEW, CHANGE_DATE } from '../constants';
import moment from 'moment';

const moveNext = (state) => {
  switch (state.viewType ) {
    case 'month':
      return { ...state, date: state.date.clone().add(1, 'month')}
    case 'week':
      return { ...state, date: state.date.clone().add(1, 'week')}
    default:
      return state;
  }
}

const movePrev = (state) => {
  switch (state.viewType ) {
    case 'month':
      return { ...state, date: state.date.clone().subtract(1, 'month')}
    case 'week':
      return { ...state, date: state.date.clone().subtract(1, 'week')}
    default:
      return state;
  }
}

const changeDate = (state, newDate) => {
  return { ...state, date: newDate.clone()}
}

const changeView = (state, newView) => {
  return { ...state, viewType: newView}
}

const initialState = {
    date: moment(),
    viewType: 'month'
}

export const calendarNavigation = (state = initialState, action) => {
  let calendarNewState = null;
  switch (action.type) {
    case MOVE_NEXT:
      calendarNewState = moveNext(state);
      return calendarNewState;
    case MOVE_PREV:
      calendarNewState = movePrev(state);
      return calendarNewState;
    case CHANGE_VIEW:
      calendarNewState = changeView(state, action.payload);
      return calendarNewState;
    case CHANGE_DATE:
      calendarNewState = changeDate(state, action.payload);
      return calendarNewState;
    default:
      return state;
  }
}
