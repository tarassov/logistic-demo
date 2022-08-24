import { FC, useEffect, useMemo } from "react";
import useLogistic from "../../hooks/use-logistic";
import {
	fetchOrders,
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

const OrdersView: FC<{ map: L.Map }> = ({ map }) => {
	const orders = useAppSelector(selectAllOrders);
	const points = useAppSelector(selectAllPoints);

	const { setRoutePoints, flyTo, position } = useLogistic(map);

	const ordersData = useMemo(() => {
		return orders.map((order) => {
			return {
				key: order.id,
				...order,
			};
		});
	}, [orders]);

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
				title: "number",
				dataIndex: "number",
			},
			{
				title: "id",
				dataIndex: "id",
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

	const onSave = (order: TOrder) => {
		dispatch(updateOrderRequested(order));
	};

	useEffect(() => {
		dispatch(fetchOrders());
	}, []);

	return (
		<>
			<EditableTable
				dataSource={ordersData}
				defaultColumns={defaultColumns}
				onSave={onSave}
			/>
		</>
	);
};

export default OrdersView;
