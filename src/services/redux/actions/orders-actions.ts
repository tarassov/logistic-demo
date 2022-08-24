import { createAction } from "@reduxjs/toolkit";

export const fetchOrders = createAction("orders/fetch/pending");
export const fetchOrdersRejected = createAction("orders/fetch/rejected");
export const fetchOrdersFulfilled = createAction<Array<TOrder>>(
	"orders/fetch/fulfilled"
);

export const updateOrderRequested = createAction<TOrder>(
	"orders/update/pending"
);
export const updateOrderRejected = createAction("orders/update/rejected");
export const updateOrderFulfilled = createAction<TOrder>(
	"orders/update/fulfilled"
);
