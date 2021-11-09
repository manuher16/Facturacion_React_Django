import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import modalClientSlice from './reducers/modalClientSlice';
import clientSlice from './reducers/ClientSlice';
export const store = configureStore({
  reducer: {
    client: clientSlice,
    modalClient: modalClientSlice,
    counter: counterReducer,
  },
});
