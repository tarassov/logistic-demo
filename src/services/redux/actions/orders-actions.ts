import { createAction } from "@reduxjs/toolkit";

export const fetchOrders = createAction("orders/fetch/pending");
export const fetchOrdersRejected = createAction("orders/fetch/rejected");
export const fetchOrdersFulfilled = createAction<Array<TOrder>>(
	"orders/fetch/fulfilled"
);
