export default interface PaymentCard {
    id: number
    type: string
    brand: string
    last4: string
    holderName: string
    expiresMonth: number
    expiresYear: number
    isDefault: boolean
}