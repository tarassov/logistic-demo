import { FC, useCallback, useEffect, useMemo } from "react";
import useLogistic from "../../hooks/use-logistic";
import {
	fetchOrders,
	selectOrderRequested,
	updateOrderRequested,
} from "../../services/redux/actions/orders-actions";
import { selectAllOrders } from "../../services/redux/features/orders-slice";
import { selectAllPoints } from "../../services/redux/features/points-slice";
import EditableTable from "../table/editable-table";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/redux/store/store";
import { pointToString } from "../../services/utils/map-converters";
import { LatLngExpression } from "leaflet";

const OrdersView: FC<{ map: L.Map }> = ({ map }) => {
	const orders = useAppSelector(selectAllOrders);
	const points = useAppSelector(selectAllPoints);
	const selectedOrder = useAppSelector((store) => store.orders.selectedOrder);

	const { setRoutePoints, flyTo, position } = useLogistic(map);

	useEffect(() => {
		if (
			selectedOrder?.from?.lat &&
			selectedOrder?.from?.lon &&
			selectedOrder?.to?.lat &&
			selectedOrder?.to?.lon
		) {
			const from: LatLngExpression = [
				selectedOrder?.from?.lat,
				selectedOrder?.from?.lon,
			];
			const to: LatLngExpression = [
				selectedOrder?.to?.lat,
				selectedOrder?.to?.lon,
			];
			setRoutePoints([from, to]);
		} else {
			setRoutePoints([]);
		}
	}, [selectedOrder?.to, selectedOrder?.from]);

	const pointsData = useMemo(() => {
		return points.map((point) => {
			return {
				value: pointToString(point),
				...point,
			};
		});
	}, [points]);

	const defaultColumns = useMemo(() => {
		return [
			{
				title: "Order number",
				dataIndex: "number",
			},
			{
				title: "from",
				dataIndex: "from",
				editable: true,
				render: (order: TOrder) =>
					order.from ? pointToString(order.from) : "",
				source: pointsData,
			},
			{
				title: "to",
				dataIndex: "to",
				render: (order: TOrder) => (order.to ? pointToString(order.to) : ""),
				editable: true,
				source: pointsData,
			},
		];
	}, [pointsData, orders]);

	const dispatch = useAppDispatch();

	const onSave = useCallback(
		(order: TOrder) => {
			dispatch(updateOrderRequested(order));
		},
		[dispatch]
	);

	const onRowSelected = useCallback(
		(order: TOrder) => {
			dispatch(selectOrderRequested(order));
		},
		[dispatch]
	);

	useEffect(() => {
		dispatch(fetchOrders());
	}, []);

	return (
		<>
			<EditableTable
				dataSource={orders}
				defaultColumns={defaultColumns}
				onSave={onSave}
				onRowSelected={onRowSelected}
			/>
		</>
	);
};

export default OrdersView;
