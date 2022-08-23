import { LatLngExpression } from "leaflet";
import { useState } from "react";
import MapView from "../logistic-map/map-view";
import MapController from "../map-contorller/map-controller";

const DEFAULT_POSITION: LatLngExpression = [41.44, 2.13];

const MainView = () => {
	const [map, setMap] = useState<L.Map>();

	const setRef = (element: L.Map) => {
		setMap(element);
	};

	return (
		<div>
			{map ? <MapController map={map} /> : "Loading..."}
			<MapView initilaPosition={DEFAULT_POSITION} ref={setRef} />;
		</div>
	);
};

export default MainView;
