import {
	createEntityAdapter,
	createSlice,
	EntityState,
	PayloadAction,
} from "@reduxjs/toolkit";
import {
	fetchOrders,
	fetchOrdersFulfilled,
	fetchOrdersRejected,
} from "../actions/orders-actions";
import { RootState } from "../store/store";

export interface IOrdersState extends EntityState<TOrder> {
	loading: boolean;
	error: boolean;
}

export const ordersAdapter = createEntityAdapter<TOrder>({
	selectId: (order) => order.id,
});

const initialState = ordersAdapter.getInitialState({
	loading: false,
	error: false,
}) as IOrdersState;

const slice = createSlice({
	name: "orders",
	initialState: initialState,
	reducers: {
		f: (state, action: PayloadAction<Array<TOrder>>) => {
			ordersAdapter.upsertMany(state, action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOrders, (state) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(fetchOrdersRejected, (state) => {
			state.loading = false;
			state.error = true;
		});
		builder.addCase(fetchOrdersFulfilled, (state, action) => {
			state.loading = false;
			state.error = false;
			ordersAdapter.upsertMany(state, action.payload);
		});
	},
});

export const { f } = slice.actions;
export default slice.reducer;

export const { selectAll: selectAllOrders } =
	ordersAdapter.getSelectors<RootState>((state) => state.orders);
