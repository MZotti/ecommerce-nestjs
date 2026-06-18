import type Address from "@/interfaces/address";
import type PaymentCard from "@/interfaces/paymentCard";

const createAddressesCollection = (addresses: Address[]): { value: string, label: string }[] => {
    const collection = addresses.map((addr => {
        return {
            value: String(addr.id),
            label: `${addr.name} - ${addr.street}, ${addr.number} - ${addr.zipCode}`
        }
    }))

    return collection
}

const createPaymentCardCollection = (cards: PaymentCard[]): { value: string, label: string, brand: string }[] => {
    const collection = cards.map((card => {
        return {
            value: String(card.id),
            label: `**** **** **** ${card.last4} - ${card.expiresMonth}/${card.expiresYear}`,
            brand: card.brand
        }
    }))

    return collection
}

export {
    createAddressesCollection,
    createPaymentCardCollection
}