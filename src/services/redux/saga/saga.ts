import { all, call, takeEvery, put } from "redux-saga/effects";
import apiGeo from "../../api/api-geo";
import ordersApi from "../../api/mocked-api";
import {
	fetchOrders,
	fetchOrdersFulfilled,
	fetchOrdersRejected,
	updateOrderRejected,
	updateOrderFulfilled,
	updateOrderRequested,
	selectOrderRequested,
	selectOrderFulfilled,
	selectOrderRejected,
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

function* updateOrder(action: {
	payload: { order: TOrder; select: boolean };
	type: string;
}) {
	try {
		const updatedOrder: TOrder = yield call(
			ordersApi.updateOrder,
			action.payload.order
		);
		yield put(updateOrderFulfilled(updatedOrder));
		if (action.payload.select) yield put(selectOrderRequested(updatedOrder));
	} catch (e) {
		yield put(updateOrderRejected());
	}
}

function* selectOrder(action: { payload: TOrder; type: string }) {
	try {
		if (action.payload.from && action.payload.to) {
			//fetch coordiantes if necessary
			if (!action.payload.from.lat || !action.payload.to.lat) {
				const result: Array<Array<TLocationResponse>> = yield all([
					call(apiGeo.getByPoint, action.payload.from),
					call(apiGeo.getByPoint, action.payload.to),
				]);
				if (!result[0].length || !result[1].length) {
					yield put(selectOrderRejected());
				} else {
					const from = {
						...action.payload.from,
						lat: result[0][0].lat,
						lon: result[0][0].lon,
					};
					const to = {
						...action.payload.to,
						lat: result[1][0].lat,
						lon: result[1][0].lon,
					};
					yield put(
						selectOrderFulfilled({ ...action.payload, from: from, to: to })
					);
				}
			} else {
				yield put(selectOrderFulfilled(action.payload));
			}
		}
	} catch (e) {
		yield put(selectOrderRejected());
	}
}

export default function* rootSaga() {
	yield takeEvery(fetchOrders.toString(), fetchOrdersSaga);
	yield takeEvery<{
		payload: { order: TOrder; select: boolean };
		type: string;
	}>(updateOrderRequested.toString(), updateOrder);
	yield takeEvery<{
		payload: TOrder;
		type: string;
	}>(selectOrderRequested.toString(), selectOrder);
}
