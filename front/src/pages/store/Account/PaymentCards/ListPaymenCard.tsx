import { niceCardType } from "@/enums/paymentCard"
import { getCardBrandLogo } from "@/functions/paymentCard"
import { useDeletePaymentCard } from "@/hooks/store/paymentCards"
import type PaymentCard from "@/interfaces/paymentCard"
import { Box, Button, Float, GridItem, HStack, Image, Text, VStack } from "@chakra-ui/react"

const ListPaymenCard = ({ card }: { card: PaymentCard }) => {
    const { mutate: deleteAddress, isPending } = useDeletePaymentCard();

    const onRemove = () => {
        deleteAddress(card.id)
    }

    return (
        <GridItem>
            <Box outline="1px solid" outlineColor="gray.200" borderRadius="md" p={4} position="relative">
                <Float placement="top-end" offsetX="44px" offsetY="25px">
                    <HStack>
                        <Button colorPalette="red" variant="surface" size="xs" onClick={onRemove} disabled={isPending} loading={isPending} >Remove</Button>
                    </HStack>
                </Float>
                <VStack w="full" alignItems="start">
                    <HStack><Image src={String(getCardBrandLogo(card.brand))} height="30px" width="auto" /> {niceCardType[card.type]}</HStack>
                    <Text>**** **** **** {card.last4}</Text>
                    <Text>{card.expiresMonth}/{card.expiresYear}</Text>
                    <Text>{card.holderName}</Text>
                </VStack>
            </Box>
        </GridItem>
    )
}

export default ListPaymenCard