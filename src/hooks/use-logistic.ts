import L from "leaflet";
import { LatLngExpression } from "leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import "leaflet-routing-machine";
const DEFAULT_ZOOM = 10;
export default function useLogistic(map: L.Map) {
	const [position, setPosition] = useState(() => map.getCenter());
	const [routePoints, setRoutePoints] = useState<Array<LatLngExpression>>();
	const [distance, setDistance] = useState(0);

	//empty route
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
			addWaypoints: false,
			fitSelectedRoutes: "smart",
			showAlternatives: false,
		});
	}, []);

	const onMove = useCallback(() => {
		setPosition(map.getCenter());
	}, [map]);

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

	useEffect(() => {
		map.on("move", onMove);
		return () => {
			map.off("move", onMove);
		};
	}, [map, onMove]);

	const onNewRoute = useCallback(
		(e: L.LeafletEvent) => {
			if ("routes" in e) {
				const route = (e as unknown as L.Routing.RoutingResultEvent).routes[0];
				const summary = route.summary;
				setDistance(summary?.totalDistance || 0);
			}
		},
		[map]
	);

	const flyTo = (point: L.LatLngTuple) => {
		map.flyTo(point, DEFAULT_ZOOM);
	};

	return {
		distance,
		position,
		routePoints,
		flyTo,
		setRoutePoints,
	};
}
