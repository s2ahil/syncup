import { configureStore} from '@reduxjs/toolkit';


import { rootReducer } from './reducers';
import { loadState, saveState } from '../utils/LocalStorage'




const store = configureStore({
  reducer: rootReducer, 
  preloadedState: loadState(),
 
});


store.subscribe(() => {
  saveState(store.getState());
});

export { store };