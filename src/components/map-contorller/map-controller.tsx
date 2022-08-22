import L from "leaflet";
import { LatLngExpression } from "leaflet";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import "leaflet-routing-machine";

const center: LatLngExpression = [51.505, -0.09];
const zoom = 13;
const barcelona: LatLngExpression = [41.44, 2.13];
const to: LatLngExpression = [41.55, 2.36];

const from2: LatLngExpression = [51.44, 2.13];
const to2: LatLngExpression = [51.55, 2.36];

const MapController: FC<{ map: L.Map }> = ({ map }) => {
	const [position, setPosition] = useState(() => map.getCenter());
	const [routePoints, setRoutePoints] = useState<Array<LatLngExpression>>();
	const [distance, setDistance] = useState(0);

	const routeControl = useMemo(() => {
		return L.Routing.control({
			waypoints: [],
			show: false,
			lineOptions: {
				styles: [
					{
						color: "blue",
						opacity: 0.6,
						weight: 4,
					},
				],
				extendToWaypoints: true,
				addWaypoints: true,
				missingRouteTolerance: 1,
			},
			addWaypoints: true,
			fitSelectedRoutes: false,
			showAlternatives: false,
		});
	}, []);

	const onClick = useCallback(() => {
		map.flyTo(center, zoom);
	}, [map]);

	const toBarcelona = useCallback(() => {
		map.flyTo(barcelona, zoom);
	}, []);

	useEffect(() => {
		if (routeControl && routePoints) {
			routeControl.setWaypoints([
				L.latLng(routePoints[0]),
				L.latLng(routePoints[1]),
			]);
			routeControl.on("routesfound", onNewRoute);
			routeControl?.addTo(map);
		}
	}, [routePoints]);

	const makeRoute = useCallback(() => {
		setRoutePoints([barcelona, to]);
	}, []);

	const makeRoute2 = useCallback(() => {
		setRoutePoints([from2, to2]);
	}, []);

	const onMove = useCallback(() => {
		setPosition(map.getCenter());
	}, [map]);

	const onNewRoute = useCallback(
		(e: L.LeafletEvent) => {
			if ("routes" in e) {
				const route = (e as unknown as L.Routing.RoutingResultEvent).routes[0];
				const line = L.Routing.line(route);
				map.fitBounds(line.getBounds());
				const summary = route.summary;
				setDistance(summary?.totalDistance || 0);
			}
		},
		[map]
	);

	useEffect(() => {
		map.on("move", onMove);
		return () => {
			console.log("map off");
			map.off("move", onMove);
		};
	}, [map, onMove]);

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
