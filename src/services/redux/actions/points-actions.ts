import { createAction } from "@reduxjs/toolkit";

export const fetchPoints = createAction("points/fetch/pending");
export const fetchPointsRejected = createAction("points/fetch/rejected");
export const fetchPointsFulfilled = createAction<Array<TPoint>>(
	"points/fetch/fulfilled"
);
