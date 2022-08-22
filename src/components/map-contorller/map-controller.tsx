import { LatLngExpression } from "leaflet";
import { FC, useCallback, useEffect, useState } from "react";
const center: LatLngExpression = [51.505, -0.09];
const zoom = 13;
const MapController: FC<{ map: L.Map }> = ({ map }) => {
	const [position, setPosition] = useState(() => map.getCenter());

	const onClick = useCallback(() => {
		map.setView(center, zoom);
	}, [map]);

	const onMove = useCallback(() => {
		console.log(map);
		setPosition(map.getCenter());
	}, [map]);

	useEffect(() => {
		console.log(map);
		map.on("move", onMove);
		return () => {
			map.off("move", onMove);
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
