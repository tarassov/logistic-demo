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
	isBuilding: boolean;
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
	isBuilding: false,
};

const slice = createSlice({
	name: "map",
	initialState: initialState,
	reducers: {
		buildRouteReuqested: (state) => {
			state.isBuilding = true;
		},
		buildRouteRejected: (state) => {
			state.isBuilding = false;
		},
		buildRouteFullfilled: (state, action: PayloadAction<TRouteInfo>) => {
			state.route = action.payload;
			state.isBuilding = false;
		},
	},
});

export const { buildRouteFullfilled, buildRouteRejected, buildRouteReuqested } =
	slice.actions;
export default slice.reducer;
