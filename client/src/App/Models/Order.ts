export interface ShippingAddress {
	fullName: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}

export interface OrderItem {
	productId: number;
	name: string;
	price: number;
	pictureURL: string;
	quantity: number;
}

export interface Order {
	id: number;
	buyerId: string;
	shippingAddress: ShippingAddress;
	orderDate: string;
	orderItems: OrderItem[];
	subtotal: number;
	deliveryFee: number;
	total: number;
	orderStatus: string;
}
