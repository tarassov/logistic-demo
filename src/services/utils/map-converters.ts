import L from "leaflet";
import { TRouteInfo } from "../redux/features/map-slice";

export const boundsToRouteInfoBounds = (
	bounds: L.LatLngBounds
): {
	southWest: {
		lat: number;
		lng: number;
	};
	northEast: {
		lat: number;
		lng: number;
	};
} => {
	const southWest = bounds.getSouthWest();
	const northEast = bounds.getNorthEast();
	return {
		southWest: {
			lat: southWest.lat,
			lng: southWest.lng,
		},
		northEast: {
			lat: northEast.lat,
			lng: northEast.lng,
		},
	};
};

export const routeInfoToBounds = (
	routeInfo: TRouteInfo
): L.LatLngBounds | undefined => {
	if (routeInfo.bounds) {
		return L.latLngBounds(
			[routeInfo.bounds?.southWest.lat, routeInfo.bounds?.southWest.lng],
			[routeInfo.bounds?.northEast.lat, routeInfo.bounds?.northEast.lng]
		);
	}
	return undefined;
};
