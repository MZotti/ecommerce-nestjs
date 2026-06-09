import type User from "./user"

export default interface Customer {
    id: number
    document: string
    phone: string
    birthDate: Date
    user: User
}