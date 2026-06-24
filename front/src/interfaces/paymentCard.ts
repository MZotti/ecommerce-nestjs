export default interface PaymentCard {
    id: number
    type: "CREDIT_CARD" | "DEBIT_CARD"
    brand: string
    last4: string
    holderName: string
    expiresMonth: number
    expiresYear: number
    isDefault: boolean
}