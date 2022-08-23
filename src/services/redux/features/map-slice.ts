import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TRouteInfo = {
	name?: string;
	summary: {
		totalDistance?: number;
		totalTime?: number;
	};
	bounds?: {
		southWest: {
			lat: number;
			lng: number;
		};
		northEast: {
			lat: number;
			lng: number;
		};
	};
};
export type TMap = {
	route: TRouteInfo;
};
const initialState: TMap = {
	route: {
		name: "",
		summary: {
			totalDistance: undefined,
			totalTime: undefined,
		},
		bounds: undefined,
	},
};

const slice = createSlice({
	name: "map",
	initialState: initialState,
	reducers: {
		setRoute: (state, action: PayloadAction<TRouteInfo>) => {
			state.route = action.payload;
		},
	},
});

export const { setRoute } = slice.actions;
export default slice.reducer;
