import type { OrderStatus, PaymentMethods } from "@/enums/order"

export default interface Order {
    id: number
    userId: number
    total: number
    paymentMethod: PaymentMethods
    status: OrderStatus
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

export interface OrderItem {
    productId: number
    productName: string
    productImageUrl?: string
    quantity: number
    price: number
}