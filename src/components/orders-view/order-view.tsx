//import { Button } from "antd";
//import { LatLngExpression } from "leaflet";
import { FC } from "react";
import useLogistic from "../../hooks/use-logistic";

const OrdersView: FC<{ map: L.Map }> = ({ map }) => {
	useLogistic(map);

	return <></>;
};

export default OrdersView;
