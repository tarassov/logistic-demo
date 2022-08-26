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

export default function useLogistic(map: L.Map | null) {
	const [currentMap, setCurrentMap] = useState(map);
	const { route } = useAppSelector((store) => store.map);
	const [routeControl, setRouteControl] = useState<L.Routing.Control>();

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

	const OnRouteError = useCallback(() => {
		dispatch(buildRouteRejected());
	}, [dispatch]);

	//fix map size and fit route bounde after parent container has resized
	const fixSize = useCallback(() => {
		currentMap?.invalidateSize();
		const routeBounds = routeInfoToBounds(route);
		if (routeBounds) {
			currentMap?.fitBounds(routeBounds);
		}
	}, [currentMap, route]);

	const bulidRoute = (routePoints: Array<LatLngExpression>) => {
		let r: L.Routing.Control;

		if (!routeControl) {
			const plan = new L.Routing.Plan([], { draggableWaypoints: false });

			r = L.Routing.control({
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
			r.on("routingerror", OnRouteError);
			setRouteControl(r);
		} else {
			r = routeControl;
		}
		r.setWaypoints([L.latLng(routePoints[0]), L.latLng(routePoints[1])]);
		if (routePoints.length) dispatch(buildRouteReuqested());
		if (currentMap) r?.addTo(currentMap);
	};

	return {
		bulidRoute,
		fixSize,
		setCurrentMap,
		currentMap,
	};
}
