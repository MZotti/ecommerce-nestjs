import { createPaymentCardCollection } from '@/functions/checkout'
import { getCardBrandLogo } from '@/functions/paymentCard'
import type { State } from '@/state/reducers'
import { Box, createListCollection, Image, RadioCard, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

const CheckoutPaymentCard = () => {
    const { setValue, formState: { errors }, clearErrors } = useFormContext()
    const auth = useSelector(({ auth }: State) => auth)
    const cards = auth.user?.paymentCards || []

    const [cardId, setCardId] = useState<number>(0);

    const hasError = errors?.cardNumber;
    const errorMessage = errors?.cardNumber?.message?.toString() || ""

    const collection = createListCollection({
        items: createPaymentCardCollection(cards)
    })

    const onChange = (option: number) => {
        setCardId(option)
        const selectedCard = cards.find(card => card.id === Number(option));

        if (!selectedCard) {
            console.warn("Invalid card")
            return;
        }

        setValue("cardNumber", selectedCard.last4);
        setValue("cardBrand", selectedCard.brand);
        setValue("holderName", selectedCard.holderName);
        setValue("expiresMonth", selectedCard.expiresMonth);
        setValue("expiresYear", selectedCard.expiresYear);
        clearErrors("cardNumber");
    }

    return (
        <VStack p={4} borderRadius={4} outline="1px solid" outlineColor={hasError ? "red.400" : "transparent"} backgroundColor={hasError ? "red.200" : "inherit"} alignItems="start" w="full" transition="0.2s all ease">
            <RadioCard.Root w="full" size="lg" colorPalette="orange" variant="solid" value={String(cardId)} onValueChange={(e) => onChange(Number(e.value))} >
                <RadioCard.Label fontSize="md">Select card to use</RadioCard.Label>
                <VStack align="stretch">
                    {
                        collection.items.map((item) => (
                            <RadioCard.Item cursor="pointer" key={item.value} value={item.value}>
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl alignItems="center">
                                    <RadioCard.ItemIndicator />
                                    <Box p={1} backgroundColor="white">
                                        <Image src={String(getCardBrandLogo(item.brand))} width="40px" />
                                    </Box>
                                    <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        ))
                    }
                </VStack>
            </RadioCard.Root>
            <Text fontWeight="bold" fontSize="sm" color="red">{errorMessage}</Text>
        </VStack>
    )
}

export default CheckoutPaymentCard