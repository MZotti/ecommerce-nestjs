import type Address from "@/interfaces/address";

const createAddressesCollection = (addresses: Address[]): { value: string, label: string }[] => {
    const collection = addresses.map((addr => {
        return {
            value: String(addr.id),
            label: `${addr.street}, ${addr.number} - ${addr.zipCode}`
        }
    }))

    return collection
}

export {
    createAddressesCollection
}