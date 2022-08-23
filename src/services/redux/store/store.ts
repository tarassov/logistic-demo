import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import {
	useDispatch,
	TypedUseSelectorHook,
	useSelector as selectorHook,
} from "react-redux";
import pointsSlice from "../features/points-slice";
import mapSlice from "../features/map-slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		points: pointsSlice,
		map: mapSlice,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
