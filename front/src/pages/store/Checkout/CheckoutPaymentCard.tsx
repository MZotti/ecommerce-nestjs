import LoadingBar from '@/components/LoadingBar'
import { createPaymentCardCollection } from '@/functions/checkout'
import { getCardBrandLogo } from '@/functions/paymentCard'
import { useGetPaymentCards } from '@/hooks/store/paymentCards'
import type { State } from '@/state/reducers'
import { Box, createListCollection, GridItem, HStack, Image, RadioCard, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

const CheckoutPaymentCard = ({ cardType }: { cardType: string }) => {
    const { paymentCards: cards } = useSelector(({ store }: State) => store.customer)
    const { isFetching } = useGetPaymentCards(cards);

    const { setValue, formState: { errors }, clearErrors } = useFormContext()

    const [cardId, setCardId] = useState<number>(0);

    const hasError = errors?.cardNumber;
    const errorMessage = errors?.cardNumber?.message?.toString() || ""

    const collection = createListCollection({
        items: createPaymentCardCollection(cards.filter(card => card.type === `${cardType}_CARD`))
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

    if (isFetching)
        return (
            <LoadingBar label='cards' />
        )

    return (
        <VStack  borderRadius={4} outline="1px solid" outlineColor={hasError ? "red.400" : "transparent"} backgroundColor={hasError ? "red.200" : "inherit"} alignItems="start" w="full" transition="0.2s all ease">
            <RadioCard.Root w="full" size="lg" colorPalette="orange" variant="solid" value={String(cardId)} onValueChange={(e) => onChange(Number(e.value))} >
                <RadioCard.Label fontSize="md">Select card to use</RadioCard.Label>
                <SimpleGrid columns={[3]} gap="0.5rem" >
                    {
                        collection.items.map((item) => (
                            <GridItem>
                                <RadioCard.Item cursor="pointer" key={item.value} value={item.value}>
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl alignItems="center">
                                        <VStack alignItems="start" gap={6}>
                                            <HStack>
                                                <RadioCard.ItemIndicator />
                                                <Box p={1} backgroundColor="white">
                                                    <Image src={String(getCardBrandLogo(item.brand))} width="auto" height="18px" />
                                                </Box>
                                            </HStack>
                                            <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
                                        </VStack>
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                            </GridItem>
                        ))
                    }
                </SimpleGrid>
            </RadioCard.Root>
            <Text fontWeight="bold" fontSize="sm" color="red">{errorMessage}</Text>
        </VStack>
    )
}

export default CheckoutPaymentCard