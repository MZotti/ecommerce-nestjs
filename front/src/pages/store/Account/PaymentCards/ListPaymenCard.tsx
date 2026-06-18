import { niceCardType } from "@/enums/paymentCard"
import { getCardBrandLogo } from "@/functions/paymentCard"
import type PaymentCard from "@/interfaces/paymentCard"
import { HStack, Image, Text, VStack } from "@chakra-ui/react"

const ListPaymenCard = ({ card }: { card: PaymentCard }) => {
    return (
        <VStack w="full" alignItems="start">
            <HStack><Image src={String(getCardBrandLogo(card.brand))} width="40px" /> {niceCardType[card.type]}</HStack>
            <Text>**** **** **** {card.last4}</Text>
            <Text>{card.expiresMonth}/{card.expiresYear}</Text>
            <Text>{card.holderName}</Text>
        </VStack>
    )
}

export default ListPaymenCard