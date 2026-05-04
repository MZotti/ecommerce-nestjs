export enum PaymentMethods {
	PIX = 'PIX',
	PAYMENT_ORDER = 'PAYMENT_ORDER',
	CREDIT = 'CREDIT',
	DEBIT = 'DEBIT'
}

export enum OrderStatus {
	PENDING = 'PENDING',
	PAID = 'PAID',
	SHIPPED = 'SHIPPED',
	CANCELED = 'CANCELED',
	FINISHED = 'FINISHED'
}

export enum OrderStatusColor {
	PENDING = 'orange',
	PAID = 'yellow',
	SHIPPED = 'blue',
	CANCELED = 'red',
	FINISHED = 'green'
}