import { Button, Col, Row } from "antd";
import { LatLngExpression } from "leaflet";
import { FC, useCallback, useEffect, useMemo } from "react";
import useLogistic from "../../hooks/use-logistic";
import { fetchOrders } from "../../services/redux/actions/orders-actions";
import { selectAllOrders } from "../../services/redux/features/orders-slice";
import { selectAllPoints } from "../../services/redux/features/points-slice";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/redux/store/store";
import EditableTable from "../table/editable-table";

const center: LatLngExpression = [51.505, -0.09];
const barcelona: LatLngExpression = [41.44, 2.13];
const to: LatLngExpression = [41.55, 2.36];
const from2: LatLngExpression = [51.44, 2.13];
const to2: LatLngExpression = [51.55, 2.36];

const MapController: FC<{ map: L.Map }> = ({ map }) => {
	const { setRoutePoints, flyTo, position } = useLogistic(map);
	const orders = useAppSelector(selectAllOrders);
	const points = useAppSelector(selectAllPoints);

	const ordersData = useMemo(() => {
		return orders.map((order) => {
			return {
				key: order.id,
				...order,
				fromName: `${order?.from?.country}  ${order?.from?.street}`,
				toName: `${order?.to?.country}  ${order?.to?.street}`,
			};
		});
	}, [orders]);

	const pointsData = useMemo(() => {
		return points.map((point) => {
			return {
				id: point.id,
				value: `${point?.country}  ${point?.street}`,
			};
		});
	}, [points]);

	const defaultColumns = useMemo(() => {
		return [
			{
				title: "number",
				dataIndex: "number",
			},
			{
				title: "id",
				dataIndex: "id",
			},
			{
				title: "from",
				dataIndex: "fromName",
				editable: true,
				source: pointsData,
			},
			{
				title: "to",
				dataIndex: "toName",
				editable: true,
				source: pointsData,
			},
		];
	}, [pointsData]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchOrders());
	}, []);

	const onClick = useCallback(() => {
		flyTo(center);
	}, [map]);

	const toBarcelona = useCallback(() => {
		flyTo(barcelona);
	}, []);

	const makeRoute = useCallback(() => {
		setRoutePoints([barcelona, to]);
	}, []);

	const makeRoute2 = useCallback(() => {
		setRoutePoints([from2, to2]);
	}, []);

	return (
		<div>
			latitude: {position?.lat.toFixed(4)}, longitude:{" "}
			{position?.lng.toFixed(4)} <button onClick={onClick}>reset</button>
			<button onClick={toBarcelona}>barcelona</button>
			<Button type="primary" onClick={makeRoute}>
				makeRoute
			</Button>
			<button onClick={makeRoute2}>makeRoute2</button>
			{/* <div
				style={{
					backgroundColor: "red",
					width: "100%",
					height: "500px",
					overflowY: "scroll",
				}}
			>
				dfgdf
			</div> */}
		</div>
	);
};

export default MapController;
