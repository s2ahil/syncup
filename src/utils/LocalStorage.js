import React from 'react'

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('interviewScheduler');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('interviewScheduler', serializedState);
    } catch (err) {
      // Handle errors here

      console.log(err)
    }
  };

