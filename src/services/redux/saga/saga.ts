import { call, takeEvery, put } from "redux-saga/effects";

import ordersApi from "../../api/mocked-api";
import {
	fetchOrders,
	fetchOrdersFulfilled,
	fetchOrdersRejected,
} from "../actions/orders-actions";

export function* fetchOrdersSaga() {
	try {
		const result: Array<TOrder> = yield call(ordersApi.getOrders);
		yield put(fetchOrdersFulfilled(result));
	} catch (e) {
		yield put(fetchOrdersRejected);
	}
}

export default function* rootSaga() {
	yield takeEvery(fetchOrders.toString(), fetchOrdersSaga);
}
