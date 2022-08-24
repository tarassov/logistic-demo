type TPoint = {
	id: number;
	country?: string;
	state?: string;
	street?: string;
	building?: string;
	city?: string;
	lat?: number;
	lon?: number;
	index?: number;
};

type TOrder = {
	id: number;
	number?: string;
	from?: TPoint;
	to?: TPoint;
};
