import { LatLngExpression } from "leaflet";
import { FC, useCallback } from "react";
import useLogistic from "../../hooks/use-logistic";

const center: LatLngExpression = [51.505, -0.09];
const barcelona: LatLngExpression = [41.44, 2.13];
const to: LatLngExpression = [41.55, 2.36];
const from2: LatLngExpression = [51.44, 2.13];
const to2: LatLngExpression = [51.55, 2.36];

const MapController: FC<{ map: L.Map }> = ({ map }) => {
	const { setRoutePoints, flyTo, position, distance } = useLogistic(map);

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
			<button onClick={makeRoute}>makeRoute</button>
			<button onClick={makeRoute2}>makeRoute2</button>
			{distance > 0 && `distance: ${distance?.toFixed(4)}`}
		</p>
	);
};

export default MapController;
