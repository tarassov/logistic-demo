import { LatLngExpression } from "leaflet";
import { FC, useCallback, useEffect, useState, RefObject } from "react";
const center: LatLngExpression = [51.505, -0.09];
const zoom = 13;
const MapController: FC<{ map: RefObject<L.Map> }> = ({ map }) => {
	const [position, setPosition] = useState(() => map.current?.getCenter());

	const onClick = useCallback(() => {
		map.current?.setView(center, zoom);
	}, [map]);

	const onMove = useCallback(() => {
		setPosition(map.current?.getCenter());
	}, [map]);

	useEffect(() => {
		map.current?.on("move", onMove);
		return () => {
			map.current?.off("move", onMove);
		};
	}, [map, onMove]);

	return (
		<p>
			latitude: {position?.lat.toFixed(4)}, longitude:{" "}
			{position?.lng.toFixed(4)} <button onClick={onClick}>reset</button>
		</p>
	);
};

export default MapController;
