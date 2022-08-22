import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type TPointState = {
	x: number | null;
	y: number | null;
	name: string | null;
};
const initialState: Array<TPointState> = [];

const slice = createSlice({
	name: "points",
	initialState: initialState,
	reducers: {
		addPoint: (state, action: PayloadAction<TPointState>) => {
			state.push(action.payload);
		},
	},
});

export const { addPoint } = slice.actions;
export default slice.reducer;
