import {
	createEntityAdapter,
	createSlice,
	EntityState,
} from "@reduxjs/toolkit";
import {
	fetchOrders,
	fetchOrdersFulfilled,
	fetchOrdersRejected,
	selectOrderFulfilled,
	selectOrderRejected,
	updateOrderFulfilled,
} from "../actions/orders-actions";
import { RootState } from "../store/store";

export interface IOrdersState extends EntityState<TOrder> {
	loading: boolean;
	error: boolean;
	selectedOrder: TOrder | null;
}

export const ordersAdapter = createEntityAdapter<TOrder>({
	selectId: (order) => order.id,
});

const initialState = ordersAdapter.getInitialState({
	loading: false,
	error: false,
	selectedOrder: null,
}) as IOrdersState;

const slice = createSlice({
	name: "orders",
	initialState: initialState,
	reducers: {},
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
		builder.addCase(updateOrderFulfilled, (state, action) => {
			ordersAdapter.upsertOne(state, action.payload);
		});
		builder.addCase(selectOrderFulfilled, (state, action) => {
			state.selectedOrder = action.payload;
		});
		builder.addCase(selectOrderRejected, (state) => {
			state.selectedOrder = null;
		});
	},
});

export default slice.reducer;

export const { selectAll: selectAllOrders } =
	ordersAdapter.getSelectors<RootState>((state) => state.orders);
