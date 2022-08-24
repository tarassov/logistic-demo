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
		street: "Sagrada de Familia",
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
	{
		id: 5,
		country: "ES",
		city: "Malaga",
		street: "Calle Barroso 1",
	},
	{
		id: 6,
		country: "ES",
		city: "Pineda de mar",
		street: "",
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
	{
		id: 4,
		number: "order 4",
		from: points[4],
		to: points[2],
	},
];
