export default interface User {
    id: number
    name: string
    email: string
    isActive: boolean
    role: Role
    avatarUrl?: string
}

export interface Role {
    id: number
    name: string
}