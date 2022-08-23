import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import styles from "./logistic-map.module.css";

const DEFAULT_ZOOM = 10;

const MapView = React.forwardRef<
	L.Map,
	{ initilaPosition: LatLngExpression; zoom?: number }
>((props, ref) => {
	return (
		<MapContainer
			className={styles.logisticMap}
			center={props.initilaPosition}
			zoom={props.zoom || DEFAULT_ZOOM}
			scrollWheelZoom={true}
			ref={ref}
		>
			<TileLayer
				attribution="Demo logistic"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	);
});
MapView.displayName = "MapView";

export default MapView;
