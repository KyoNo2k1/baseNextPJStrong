import appSlice from './appSlice';
import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
// import roleSlice from './roleSlice'

enableMapSet();
export const store = configureStore({
  reducer: {
    appSlice: appSlice,
  },

  //   setup serializableCheck to false -> to deal with actions that need to accept non-serializable data
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
