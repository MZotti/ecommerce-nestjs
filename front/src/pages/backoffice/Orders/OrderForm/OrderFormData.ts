import type { OrderItem } from "@/interfaces/order"

export default interface OrderFormData {
    userId: number
    paymentMethod: number
    items: OrderItem[]
}