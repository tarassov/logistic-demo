import { FC, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

// import MarkerClusterGroup from "react-leaflet-markercluster";
import styles from "./logistic-map.module.css";
import { LatLngExpression } from "leaflet";
import MapController from "../map-contorller/map-controller";

const center: LatLngExpression = [51.505, -0.09];
const zoom = 13;

const LogisticMap: FC = () => {
	const [map, setMap] = useState<L.Map>();

	const setRef = (element: any) => {
		setMap(element);
	};

	return (
		<div>
			<MapContainer
				className={styles.logisticMap}
				center={center}
				zoom={zoom}
				scrollWheelZoom={false}
				ref={setRef}
			>
				<TileLayer
					attribution="Demo logistic"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
			{map ? <MapController map={map} /> : "Loading"}
		</div>
	);
};

export default LogisticMap;
