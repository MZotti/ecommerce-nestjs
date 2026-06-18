import type { OrderStatus, PaymentMethods } from "@/enums/order"

export default interface Order {
    id: number
    userId: number
    total: number
    status: OrderStatus
    paymentMethod: PaymentMethods
    orderPayment?: OrderPayment
    items: OrderItem[]
    shippingZipCode: string
    shippingStreet: string
    shippingNumber: string
    shippingComplement?: string
    shippingNeighborhood: string
    shippingCity: string
    shippingState: string
    shippingCountry: string
    createdAt: Date
}

export interface OrderPayment {
    id: number
    orderId: number
    cardToken: string
    cardBrand: string
    cardLast4: string
    cardHolderName: string
    cardExpiresMonth: number
    cardExpiresYear: number
}

export interface OrderItem {
    productId: number
    productName: string
    productImageUrl?: string
    quantity: number
    price: number
}