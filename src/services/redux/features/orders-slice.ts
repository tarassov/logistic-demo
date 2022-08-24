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
	selectOrderRequested,
	updateOrderFulfilled,
} from "../actions/orders-actions";
import { RootState } from "../store/store";

export interface IOrdersState extends EntityState<TOrder> {
	loading: boolean;
	fetchingCoordinates: boolean;
	error: boolean;
	selectedOrderId: number | null;
}

export const ordersAdapter = createEntityAdapter<TOrder>({
	selectId: (order) => order.id,
});

const initialState = ordersAdapter.getInitialState({
	loading: false,
	fetchingCoordinates: false,
	error: false,
	selectedOrderId: null,
}) as IOrdersState;

const slice = createSlice({
	name: "orders",
	initialState: initialState,
	reducers: {
		addOrder: (state) => {
			const id = state.ids.length + 1;
			const newOrder: TOrder = {
				id: id,
				number: `order N${id}`,
				from: { id: 0, country: "" },
				to: { id: 0, country: "" },
			};
			ordersAdapter.upsertOne(state, newOrder);
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
		builder.addCase(updateOrderFulfilled, (state, action) => {
			ordersAdapter.upsertOne(state, action.payload);
		});
		builder.addCase(selectOrderFulfilled, (state, action) => {
			state.selectedOrderId = action.payload.id;
			ordersAdapter.upsertOne(state, action.payload);
			state.loading = false;
			state.fetchingCoordinates = false;
		});
		builder.addCase(selectOrderRejected, (state) => {
			state.selectedOrderId = null;
			state.loading = false;
			state.fetchingCoordinates = false;
		});
		builder.addCase(selectOrderRequested, (state) => {
			state.loading = true;
			state.fetchingCoordinates = true;
		});
	},
});

export default slice.reducer;
export const { addOrder } = slice.actions;

export const { selectAll: selectAllOrders, selectById: selectOrderById } =
	ordersAdapter.getSelectors<RootState>((state) => state.orders);
