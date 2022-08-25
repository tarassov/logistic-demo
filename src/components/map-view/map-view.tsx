import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import styles from "./map-view.module.css";

const DEFAULT_ZOOM = 10;

const MapView = React.forwardRef<
	L.Map,
	{ initialPosition: LatLngExpression; zoom?: number }
>((props, ref) => {
	return (
		<MapContainer
			className={styles.logisticMap}
			center={props.initialPosition}
			zoom={props.zoom || DEFAULT_ZOOM}
			scrollWheelZoom={true}
			ref={ref}
		>
			<TileLayer
				attribution="Demo logistics"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	);
});
MapView.displayName = "MapView";

export default MapView;
