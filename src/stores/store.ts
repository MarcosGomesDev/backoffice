import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import sideMenuReducer from "./sideMenuSlice";

export const store = configureStore({
  reducer: {
    sideMenu: sideMenuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
