import LogisticMap from "../logistic-map/logistic-map";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { Button } from "antd";

const barcelona: LatLngExpression = [41.44, 2.13];
const to: LatLngExpression = [41.55, 2.36];

const MainView = () => {
	const [positionFrom, setPostionFrom] = useState<LatLngExpression | null>(
		null
	);
	const [positionTo, setPostionTo] = useState<LatLngExpression | null>(null);

	const onClick = () => {
		setPostionFrom(barcelona);
		setPostionTo(to);
	};
	return (
		<div>
			<Button onClick={onClick}>To barcelona</Button>
			<LogisticMap positionFrom={positionFrom} positionTo={positionTo} />;
		</div>
	);
};

export default MainView;
