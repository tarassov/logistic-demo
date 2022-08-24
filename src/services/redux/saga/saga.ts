import { Action } from "@redux-saga/types";
import { all, call, takeEvery, put, takeLatest } from "redux-saga/effects";

import ordersApi from "../../api/mocked-api";
import {
	fetchOrders,
	fetchOrdersFulfilled,
	fetchOrdersRejected,
	updateOrderRejected,
	updateOrderFulfilled,
	updateOrderRequested,
} from "../actions/orders-actions";
import { fetchPointsFulfilled } from "../actions/points-actions";

function* fetchOrdersSaga() {
	try {
		const [orders, points]: Array<Array<TOrder> | Array<TPoint>> = yield all([
			call(ordersApi.getOrders),
			call(ordersApi.getPoints),
		]);
		yield put(fetchOrdersFulfilled(orders as Array<TOrder>));
		yield put(fetchPointsFulfilled(points as Array<TPoint>));
	} catch (e) {
		yield put(fetchOrdersRejected);
	}
}

function* updateOrder(action: { payload: TOrder; type: string }) {
	try {
		const updatedOrder: TOrder = yield call(
			ordersApi.updateOrder,
			action.payload
		);
		yield put(updateOrderFulfilled(updatedOrder));
	} catch (e) {
		yield put(updateOrderRejected);
	}
}

export default function* rootSaga() {
	yield takeEvery(fetchOrders.toString(), fetchOrdersSaga);
	yield takeEvery<{
		payload: TOrder;
		type: string;
	}>(updateOrderRequested.toString(), updateOrder);
}
