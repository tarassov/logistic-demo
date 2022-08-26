import L from "leaflet";
import { LatLngExpression } from "leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import "leaflet-routing-machine";
import { useAppDispatch, useAppSelector } from "../services/redux/store/store";
import {
	buildRouteFullfilled,
	buildRouteRejected,
	buildRouteReuqested,
	TRouteInfo,
} from "../services/redux/features/map-slice";
import {
	boundsToRouteInfoBounds,
	routeInfoToBounds,
} from "../services/utils/map-converters";
const DEFAULT_ZOOM = 10;

export default function useLogistic(map: L.Map | null) {
	const [currentMap, setCurrentMap] = useState(map);
	const [position, setPosition] = useState(() => map?.getCenter());
	const [routePoints, setRoutePoints] = useState<Array<LatLngExpression>>();
	const { route } = useAppSelector((store) => store.map);

	const dispatch = useAppDispatch();

	const onNewRoute = useCallback(
		(e: L.LeafletEvent) => {
			if ("routes" in e) {
				const route = (e as unknown as L.Routing.RoutingResultEvent).routes[0];
				const bounds = L.Routing.line(route).getBounds();
				const info: TRouteInfo = {
					name: route.name,
					bounds: boundsToRouteInfoBounds(bounds),
					summary: {
						totalDistance: route.summary?.totalDistance,
						totalTime: route.summary?.totalTime,
					},
				};
				dispatch(buildRouteFullfilled(info));
			}
		},
		[currentMap, dispatch]
	);
	const onRoutingStart = useCallback(() => {
		dispatch(buildRouteReuqested());
	}, [dispatch]);
	const OnRouteError = useCallback(() => {
		dispatch(buildRouteRejected());
	}, [dispatch]);

	//empty route
	const routeControl = useMemo(() => {
		const plan = new L.Routing.Plan([], { draggableWaypoints: false });
		const r = L.Routing.control({
			waypoints: [],
			show: false,
			plan: plan,
			lineOptions: {
				styles: [
					{
						color: "#5618ff",
						opacity: 0.6,
						weight: 4,
					},
				],
				extendToWaypoints: true,
				addWaypoints: false,
				missingRouteTolerance: 1,
			},
			addWaypoints: false,
			fitSelectedRoutes: true,
			showAlternatives: false,
		});
		r.on("routesfound", onNewRoute);
		r.on("routingstart", onRoutingStart);
		r.on("routingerror", OnRouteError);
		return r;
	}, []);

	//track currentPosition
	const onMove = useCallback(() => {
		setPosition(currentMap?.getCenter());
	}, [currentMap]);

	//fix map size and fit route bounde after parent container has resized
	const fixSize = useCallback(() => {
		currentMap?.invalidateSize();
		const routeBounds = routeInfoToBounds(route);
		if (routeBounds) {
			currentMap?.fitBounds(routeBounds);
		}
	}, [currentMap, route]);

	//build the route when routePoints have changed
	useEffect(() => {
		if (routeControl && routePoints) {
			routeControl.setWaypoints([
				L.latLng(routePoints[0]),
				L.latLng(routePoints[1]),
			]);
			if (currentMap) routeControl?.addTo(currentMap);
		}
	}, [routePoints]);

	//subscribe to map move
	useEffect(() => {
		currentMap?.on("move", onMove);
		return () => {
			currentMap?.off("move", onMove);
		};
	}, [currentMap, onMove]);

	const flyTo = (point: L.LatLngTuple) => {
		currentMap?.flyTo(point, DEFAULT_ZOOM);
	};

	return {
		position,
		routePoints,
		flyTo,
		setRoutePoints,
		fixSize,
		setCurrentMap,
		currentMap,
	};
}
