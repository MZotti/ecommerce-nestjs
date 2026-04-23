export default interface User {
    id: string
    name: string
    email: string
    role: Role
    avatarUrl?: string
}

export interface Role {
    id: string
    name: string
}