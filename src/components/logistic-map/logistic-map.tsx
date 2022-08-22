import { FC, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

// import MarkerClusterGroup from "react-leaflet-markercluster";
import styles from "./logistic-map.module.css";
import { LatLngExpression } from "leaflet";
import MapController from "../map-contorller/map-controller";

const center: LatLngExpression = [51.505, -0.09];
const zoom = 13;

const LogisticMap: FC = () => {
	const map = useRef<L.Map>(null);
	// const map =
	// 		useRef <
	// 		React.ForwardRefExoticComponent<
	// 			MapContainerProps & React.RefAttributes<LeafletMap>
	// 		>(null);

	// const displayMap = useMemo(
	// 	() => (
	// 		<MapContainer
	// 			className={styles.logisticMap}
	// 			center={center}
	// 			zoom={zoom}
	// 			scrollWheelZoom={false}
	// 			ref={map}
	// 		>
	// 			<TileLayer
	// 				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	// 				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	// 			/>
	// 		</MapContainer>
	// 	),
	// 	[]
	// );

	return (
		<div>
			{map ? <MapController map={map} /> : "Loading"}
			<MapContainer
				className={styles.logisticMap}
				center={center}
				zoom={zoom}
				scrollWheelZoom={false}
				ref={map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
};

export default LogisticMap;
