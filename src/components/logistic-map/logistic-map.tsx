import { FC, useState, useEffect } from "react";
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

const defaultCenter: LatLngExpression = [41.44, 2.13];
const zoom = 10;

const LogisticMap: FC<{
	positionFrom?: LatLngExpression | null;
	positionTo?: LatLngExpression | null;
}> = ({ positionFrom, positionTo }) => {
	const [map, setMap] = useState<L.Map>();
	const [center, setCenter] = useState<LatLngExpression>();
	const setRef = (element: L.Map) => {
		setMap(element);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCenter([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				console.log(error);
				setCenter(defaultCenter);
			}
		);
	}, []);

	return (
		<div>
			{center && (
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
			)}
			{map ? <MapController map={map} /> : "Loading"}
		</div>
	);
};

export default LogisticMap;
