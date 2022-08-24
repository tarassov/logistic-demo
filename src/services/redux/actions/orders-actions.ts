import { createAction } from "@reduxjs/toolkit";

export const fetchOrders = createAction("orders/fetch/pending");
export const fetchOrdersRejected = createAction("orders/fetch/rejected");
export const fetchOrdersFulfilled = createAction<Array<TOrder>>(
	"orders/fetch/fulfilled"
);

export const updateOrderRequested = createAction<{
	order: TOrder;
	select: boolean;
}>("orders/update/pending");
export const updateOrderRejected = createAction("orders/update/rejected");
export const updateOrderFulfilled = createAction<TOrder>(
	"orders/update/fulfilled"
);

export const selectOrderRequested = createAction<TOrder>(
	"orders/select/pending"
);
export const selectOrderRejected = createAction("orders/select/rejected");
export const selectOrderFulfilled = createAction<TOrder>(
	"orders/select/fulfilled"
);
