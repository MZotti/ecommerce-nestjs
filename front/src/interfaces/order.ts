import type { OrderStatus, PaymentMethods } from "@/enums/order"
import type User from "./user"

export default interface Order {
    id: number
    user: User
    total: number
    paymentMethod: PaymentMethods
    status: OrderStatus
    items: OrderItem[]
    createdAt: Date
}

export interface OrderItem {
    productId: number
    productName: string
    quantity: number
    price: number
}