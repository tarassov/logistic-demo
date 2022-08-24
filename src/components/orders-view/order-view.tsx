import { fetchOrders } from "../../services/redux/actions/orders-actions";
import { selectAllOrders } from "../../services/redux/features/orders-slice";
import { FC, useEffect } from "react";
import useLogistic from "../../hooks/use-logistic";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/redux/store/store";

const OrdersView: FC<{ map: L.Map }> = ({ map }) => {
	useLogistic(map);
	const orders = useAppSelector(selectAllOrders);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchOrders());
	}, []);

	return <></>;
};

export default OrdersView;
