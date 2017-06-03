import { MOVE_NEXT, MOVE_PREV, CHANGE_VIEW, CHANGE_DATE } from '../constants';

export const moveNext = () => {
  const action = {
    type: MOVE_NEXT,
  }
  return action;
}

export const movePrev = () => {
  const action = {
    type: MOVE_PREV,
  }
  return action;
}

export const changeView = (viewType) => {
  const action = {
    type: CHANGE_VIEW,
    payload: viewType
  }
  return action;
}

export const changeDate = (newDate) => {
  const action = {
    type: CHANGE_DATE,
    payload: newDate
  }
  return action;
}

// export const addReminder = (text, dueDate) => {
//   const action = {
//     type: ADD_REMINDER,
//     text,
//     dueDate
//   }
//   return action;
// }
//
// export const deleteReminder = (id) => {
//   const action = {
//     type: DELETE_REMINDER,
//     id
//   }
//   return action;
// }
//
// export const clearReminders = () => {
//   return {
//     type: CLEAR_REMINDERS
//   }
// }
