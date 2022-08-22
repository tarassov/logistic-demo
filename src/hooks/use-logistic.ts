import L from "leaflet";
import { LatLngExpression } from "leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import "leaflet-routing-machine";

export default function useLogistic(map: L.Map) {
	const [position, setPosition] = useState(() => map.getCenter());
	const [routePoints, setRoutePoints] = useState<Array<LatLngExpression>>();
	const [distance, setDistance] = useState(0);

	return {
		distance,
		position,
		routePoints,
	};
}
