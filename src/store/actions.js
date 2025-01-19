import { ACTION_TYPES } from "./types";

export const addInterview = (interview) => ({
    type: ACTION_TYPES.ADD_INTERVIEW,
    payload: interview
  });
  

  export const updateInterview = (id, interview) => ({
    type: ACTION_TYPES.UPDATE_INTERVIEW,
    payload: { id, interview }
  });

  export const deleteInterview = (id) => ({
    type: ACTION_TYPES.DELETE_INTERVIEW,
    payload: id
  });

  export const setFilter = (filters) => ({
    type: ACTION_TYPES.SET_FILTER,
    payload: filters
  });

  export const setNotification = (message, type = 'success') => ({
    type: ACTION_TYPES.SET_NOTIFICATION,
    payload: { message, type }
  });