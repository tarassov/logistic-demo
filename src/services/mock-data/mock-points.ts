export const points: Array<TPoint> = [
	{
		id: 1,
		country: "ES",
		city: "Madrid",
		street: "Plaza de España",
	},
	{
		id: 2,
		country: "ES",
		city: "Barcelona",
		street: "El parque Guell",
	},
	{
		id: 3,
		country: "ES",
		city: "Barcelona",
		street: "1 Diagonal",
	},
	{
		id: 4,
		country: "FR",
		city: "Paris",
		street: "Notre Dame De Paris",
	},
];

export const orders: Array<TOrder> = [
	{
		id: 1,
		number: "order 1",
		from: points[0],
		to: points[1],
	},
	{
		id: 2,
		number: "order 2",
		from: points[0],
		to: points[2],
	},
	{
		id: 3,
		number: "order 3",
		from: points[3],
		to: points[1],
	},
];
