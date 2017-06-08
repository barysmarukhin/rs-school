import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  GET_SPEAKERS,
  GET_SPEAKERS_SUCCESS,
  GET_SPEAKERS_ERROR
} from '../constants';
const initialState = {
  isEventsFetching:false,
  isSpeakersFetching:false,
  isError:false,
  events:[],
  speakers: []
}
export const ajaxDataHandler = (state=initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {...state, isEventsFetching:true, isError:false};
    case GET_EVENTS_SUCCESS:
      return {...state, isEventsFetching:false, events:action.payload, isError: false};
    case GET_EVENTS_ERROR:
      return {...state, isEventsFetching:false, isError:true};
    case GET_SPEAKERS:
      return {...state, isSpeakersFetching:true, isError:false};
    case GET_SPEAKERS_SUCCESS:
      return {...state, isSpeakersFetching:false, speakers:action.payload, isError: false};
    case GET_SPEAKERS_ERROR:
      return {...state, isSpeakersFetching:false, isError:true};
    default:
      return state;
  }
}
