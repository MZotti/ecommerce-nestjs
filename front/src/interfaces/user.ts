import type Address from "./address"
import type Customer from "./customer"

export default interface User {
    id: number
    name: string
    email: string
    isActive: boolean
    role: Role
    avatarUrl?: string

    customer?: Customer
    addresses?: Address[]
}

export interface Role {
    id: number
    name: string
}