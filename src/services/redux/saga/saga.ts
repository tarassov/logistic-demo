import { all, call, takeEvery, put, takeLatest } from "redux-saga/effects";
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

function* updateOrder(action: { payload: TOrder; type: string }) {
	try {
		const updatedOrder: TOrder = yield call(
			ordersApi.updateOrder,
			action.payload
		);
		yield put(updateOrderFulfilled(updatedOrder));
	} catch (e) {
		yield put(updateOrderRejected());
	}
}

function* fetchCoordinates(action: { payload: TOrder; type: string }) {
	try {
		if (action.payload.from && action.payload.to) {
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
					updateOrderFulfilled({ ...action.payload, from: from, to: to })
				);
				yield put(
					selectOrderFulfilled({ ...action.payload, from: from, to: to })
				);
			}
		}
	} catch (e) {
		yield put(selectOrderRejected());
	}
}

export default function* rootSaga() {
	yield takeEvery(fetchOrders.toString(), fetchOrdersSaga);
	yield takeEvery<{
		payload: TOrder;
		type: string;
	}>(updateOrderRequested.toString(), updateOrder);
	yield takeEvery<{
		payload: TOrder;
		type: string;
	}>(selectOrderRequested.toString(), fetchCoordinates);
}
