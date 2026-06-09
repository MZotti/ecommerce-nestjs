export default interface Address {
    id: number
    name: string
    zipCode: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    country: string
    isDefault: boolean
}