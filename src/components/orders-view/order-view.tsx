import { notification } from "antd";
import { FC, useCallback, useEffect, useMemo } from "react";
import useLogistic from "../../hooks/use-logistic";
import {
	fetchOrders,
	selectOrderRequested,
	updateOrderRequested,
} from "../../services/redux/actions/orders-actions";
import {
	addOrder,
	selectAllOrders,
	selectOrderById,
} from "../../services/redux/features/orders-slice";
import { selectAllPoints } from "../../services/redux/features/points-slice";
import EditableTable from "../table/editable-table";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/redux/store/store";
import { pointToString } from "../../services/utils/map-converters";
import { LatLngExpression } from "leaflet";
import type { NotificationPlacement } from "antd/lib/notification";

const OrdersView: FC<{ map: L.Map }> = ({ map }) => {
	const orders = useAppSelector(selectAllOrders);
	const points = useAppSelector(selectAllPoints);
	const selectedOrderId = useAppSelector(
		(store) => store.orders.selectedOrderId || ""
	);

	const { setRoutePoints } = useLogistic(map);

	const selectedOrder = useAppSelector((store) =>
		selectOrderById(store, selectedOrderId)
	);

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
	}, [selectedOrder]);

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
	const openNotification = (
		placement: NotificationPlacement,
		message: string,
		description: string,
		type: TNotificationType
	) => {
		notification[type]({
			message: message,
			description: description,
			placement,
		});
	};

	const onSave = useCallback(
		(order: TOrder) => {
			if (order.from?.id === order.to?.id) {
				openNotification(
					"bottom",
					"Warning",
					"Departure and destination points should be different",
					"warning"
				);
			}
			dispatch(
				updateOrderRequested({
					order: order,
					select: order.id === selectedOrderId,
				})
			);
		},
		[dispatch, selectedOrderId]
	);

	const onAdd = useCallback(() => {
		dispatch(addOrder());
	}, [dispatch]);

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
				onAdd={onAdd}
				onRowSelected={onRowSelected}
			/>
		</>
	);
};

export default OrdersView;
