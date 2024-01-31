import { configureStore} from '@reduxjs/toolkit';
// import { authApi } from '../services/authApi';
import drawingslice from './drawingslice';
import { drawingApi } from '../services/drawing';
// import authReducer from '../features/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    draw: drawingslice,
    [drawingApi.reducerPath] : drawingApi.reducer,
  },
  middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(drawingApi.middleware),
  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch)