
import { combineReducers } from 'redux';

import { ACTION_TYPES } from './types';


const initialState = {
  interviews: [],
  filters: {
    date: null,
    interviewer: '',
    candidate: ''
  },
  notification: null

};

const interviewReducer = (state = initialState.interviews, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_INTERVIEW:
      return [...state, { ...action.payload, id: Date.now() }];

    case ACTION_TYPES.UPDATE_INTERVIEW:
      return state.map(interview =>
        interview.id === action.payload.id
          ? { ...interview, ...action.payload.interview }
          : interview
      );

    case ACTION_TYPES.DELETE_INTERVIEW:
      return state.filter(interview => interview.id !== action.payload);

    default:
      return state;
  }
};

const filterReducer = (state = initialState.filters, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FILTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const notificationReducer = (state = initialState.notification, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  interviews: interviewReducer,
  filters: filterReducer,
  notification: notificationReducer
});