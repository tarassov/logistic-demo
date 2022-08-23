import { orders, points } from "../mock-data/mock-points";

const ordersApi = {
	getOrders: () => {
		return new Promise<Array<TOrder>>((resolve) => {
			setTimeout(() => resolve(orders), 1500);
		});
	},
	getPoints: () => {
		return new Promise<Array<TPoint>>((resolve) => {
			setTimeout(() => resolve(points), 1500);
		});
	},
};

export default ordersApi;
