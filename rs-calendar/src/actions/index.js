import {
  MOVE_NEXT,
  MOVE_PREV,
  CHANGE_VIEW,
  CHANGE_DATE,
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  GET_SPEAKERS,
  GET_SPEAKERS_SUCCESS,
  GET_SPEAKERS_ERROR,
  UNKNOWN_DATA
} from '../constants';

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

export const changeView = viewType => {
  const action = {
    type: CHANGE_VIEW,
    payload: viewType
  }
  return action;
}

export const changeDate = newDate => {
  const action = {
    type: CHANGE_DATE,
    payload: newDate
  }
  return action;
}

export const getEvents = () => dispatch => {
  dispatch({
      type: GET_EVENTS,
      payload: 'fetching'
    })
  const url=`http://localhost:7777/administrator/api/events`;
  getData(url,'events').then(events => dispatch(events));
}

export const getSpeakers = () => dispatch => {
  dispatch({
      type: GET_SPEAKERS,
      payload: 'fetching'
    })
  const url=`http://localhost:7777/administrator/api/speakers`;
  getData(url,'speakers').then(speakers => dispatch(speakers));
}

const getData = (url, dataType) => {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'GET' })
      .then((response)=>{
        if (response.status >= 200 && response.status < 300) {
          let res=response.json();
          res.then((calendarData)=>{
            switch (dataType) {
              case 'events':
                resolve({
                  type: GET_EVENTS_SUCCESS,
                  payload: calendarData
                })
                break;
              case 'speakers':
                resolve({
                  type: GET_SPEAKERS_SUCCESS,
                  payload: calendarData
                })
                break;
              default:
                resolve({
                  type: UNKNOWN_DATA,
                  payload: calendarData
                })
            }
          })
        } else {
          switch (dataType) {
            case 'events':
              resolve({
                type: GET_EVENTS_ERROR,
                payload: 'error'
              })
              break;
            case 'speakers':
              resolve({
                type: GET_SPEAKERS_ERROR,
                payload: 'error'
              })
              break;
            default:
              resolve({
                type: UNKNOWN_DATA,
                payload: 'error'
              })
          }
        }
    })
    .catch(()=>{
      switch (dataType) {
        case 'events':
          resolve({
            type: GET_EVENTS_ERROR,
            payload: 'error'
          })
          break;
        case 'speakers':
          resolve({
            type: GET_SPEAKERS_ERROR,
            payload: 'error'
          })
          break;
        default:
          resolve({
            type: UNKNOWN_DATA,
            payload: 'error'
          })
      }
    })
  })
}
