import {
	createEntityAdapter,
	createSlice,
	EntityState,
} from "@reduxjs/toolkit";
import {
	fetchPoints,
	fetchPointsRejected,
	fetchPointsFulfilled,
} from "../actions/points-actions";
import { RootState } from "../store/store";

export interface IPointState extends EntityState<TPoint> {
	loading: boolean;
	error: boolean;
}

export const pointsAdapter = createEntityAdapter<TPoint>({
	selectId: (order) => order.id,
});

const initialState = pointsAdapter.getInitialState({
	loading: false,
	error: false,
}) as IPointState;

const slice = createSlice({
	name: "points",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPoints, (state) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(fetchPointsRejected, (state) => {
			state.loading = false;
			state.error = true;
		});
		builder.addCase(fetchPointsFulfilled, (state, action) => {
			state.loading = false;
			state.error = false;
			pointsAdapter.upsertMany(state, action.payload);
		});
	},
});

export default slice.reducer;

export const { selectAll: selectAllPoints } =
	pointsAdapter.getSelectors<RootState>((state) => state.points);
