import type Address from "./address"
import type Customer from "./customer"
import type PaymentCard from "./paymentCard"

export default interface User {
    id: number
    name: string
    email: string
    isActive: boolean
    role: Role
    avatarUrl?: string

    customer?: Customer
    addresses?: Address[]
    paymentCards?: PaymentCard[]
}

export interface Role {
    id: number
    name: string
}