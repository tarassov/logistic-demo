import { pointToString } from "../utils/map-converters";
import { get } from "./api-base";

const apiGeo = {
	getByPoint: (point: TPoint) => {
		const q = pointToString(point);
		return get<Array<TLocationResponse>>(`?q=${q}&limit=1&format=json`);
	},
};

export default apiGeo;
