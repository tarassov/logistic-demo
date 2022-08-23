import { LatLngExpression } from "leaflet";
// import { useState } from "react";
import { SplitPane } from "react-multi-split-pane";
import useLogistic from "../../hooks/use-logistic";
import MapView from "../logistic-map/map-view";
import MapController from "../map-contorller/map-controller";

const DEFAULT_POSITION: LatLngExpression = [41.44, 2.13];

const MainView = () => {
	const { setCurrentMap, currentMap, fixSize } = useLogistic(null);

	const setRef = (element: L.Map) => {
		setCurrentMap(element);
	};

	return (
		<SplitPane split="vertical" minSize={400} onDragFinished={() => fixSize()}>
			<div>
				{" "}
				{currentMap ? <MapController map={currentMap} /> : "Loading..."}
			</div>
			<MapView initialPosition={DEFAULT_POSITION} ref={setRef} />
		</SplitPane>
	);
};

export default MainView;
