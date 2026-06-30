import LoadingBar from "@/components/LoadingBar"
import { createAddressesCollection } from "@/functions/checkout"
import { useGetAddresses } from "@/hooks/store/addresses"
import type { State } from "@/state/reducers"
import { Button, createListCollection, RadioCard, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"

const CheckoutAddress = ({ openModal }: { openModal: () => void }) => {
    const addresses = useSelector(({ store }: State) => store.addresses)
    const { isFetching } = useGetAddresses(addresses);

    const { setValue, formState: { errors }, clearErrors } = useFormContext()

    const [addressId, setAddressId] = useState<number>(0);

    const hasError = errors?.shippingCity;
    const errorMessage = errors?.shippingCity?.message?.toString() || ""

    const collection = createListCollection({
        items: createAddressesCollection(addresses)
    })

    const onChange = (option: number) => {
        setAddressId(option)
        const selectedAddress = addresses.find(addr => addr.id === Number(option));

        if (!selectedAddress) {
            console.warn("Invalid address")
            return;
        }

        setValue("shippingCity", selectedAddress.city);
        setValue("shippingCountry", selectedAddress.country);
        setValue("shippingNeighborhood", selectedAddress.neighborhood);
        setValue("shippingNumber", selectedAddress.number);
        setValue("shippingState", selectedAddress.state);
        setValue("shippingStreet", selectedAddress.street);
        setValue("shippingZipCode", selectedAddress.zipCode);
        setValue("shippingComplement", selectedAddress.complement);
        clearErrors("shippingCity");
    }

    if (isFetching)
        return (
            <LoadingBar label='addresses' />
        )

    return (
        <VStack p={4} borderRadius={4} outline="1px solid" outlineColor={hasError ? "red.400" : "transparent"} backgroundColor={hasError ? "red.200" : "inherit"} alignItems="start" w="full" transition="0.2s all ease">
            <RadioCard.Root w="full" size="lg" colorPalette="orange" variant="solid" value={String(addressId)} onValueChange={(e) => onChange(Number(e.value))} >
                <RadioCard.Label fontSize="md">Select shipping address</RadioCard.Label>
                <VStack align="stretch">
                    {
                        collection.items.map((item) => (
                            <RadioCard.Item cursor="pointer" key={item.value} value={item.value}>
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl>
                                    <RadioCard.ItemIndicator />
                                    <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        ))
                    }
                </VStack>
            </RadioCard.Root>
            <Button colorPalette="orange" onClick={openModal}>Register new address</Button>
            <Text fontWeight="bold" fontSize="sm" color="red">{errorMessage}</Text>
        </VStack>
    )
}

export default CheckoutAddress