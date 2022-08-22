import { FC, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
} from "react-leaflet";

// import MarkerClusterGroup from "react-leaflet-markercluster";
import styles from "./logistic-map.module.css";
import { LatLngExpression } from "leaflet";
import MapController from "../map-contorller/map-controller";

const center: LatLngExpression = [41.44, 2.13];
const zoom = 10;

const LogisticMap: FC<{
	positionFrom?: LatLngExpression | null;
	positionTo?: LatLngExpression | null;
}> = ({ positionFrom, positionTo }) => {
	const [map, setMap] = useState<L.Map>();

	const setRef = (element: L.Map) => {
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
				{positionFrom && (
					<Marker position={positionFrom}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				)}
				{positionTo && (
					<Marker position={positionTo}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				)}

				{positionFrom && positionTo && (
					<Polyline
						pathOptions={{ stroke: true, color: "red" }}
						positions={[[positionFrom, positionTo]]}
					/>
				)}
			</MapContainer>
			{map ? <MapController map={map} /> : "Loading"}
		</div>
	);
};

export default LogisticMap;
