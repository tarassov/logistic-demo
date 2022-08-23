import { get } from "./api-base";

const apiGeo = {
	getByPoint: (point: TPoint) => {
		return get<{ lang: number; lat: number }>(`?q=${point.country}&limit=1`);
	},
};

export default apiGeo;
