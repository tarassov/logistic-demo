import { Button } from "antd";
import { LatLngExpression } from "leaflet";
import { FC, useCallback, useEffect } from "react";
import useLogistic from "../../hooks/use-logistic";
import { fetchOrders } from "../../services/redux/actions/orders-actions";
import { useAppDispatch } from "../../services/redux/store/store";

const center: LatLngExpression = [51.505, -0.09];
const barcelona: LatLngExpression = [41.44, 2.13];
const to: LatLngExpression = [41.55, 2.36];
const from2: LatLngExpression = [51.44, 2.13];
const to2: LatLngExpression = [51.55, 2.36];

const MapController: FC<{ map: L.Map }> = ({ map }) => {
	const { setRoutePoints, flyTo, position } = useLogistic(map);

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
		<p>
			latitude: {position?.lat.toFixed(4)}, longitude:{" "}
			{position?.lng.toFixed(4)} <button onClick={onClick}>reset</button>
			<button onClick={toBarcelona}>barcelona</button>
			<Button type="primary" onClick={makeRoute}>
				makeRoute
			</Button>
			<button onClick={makeRoute2}>makeRoute2</button>
		</p>
	);
};

export default MapController;
