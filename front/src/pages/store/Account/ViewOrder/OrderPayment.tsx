import { getCardBrandLogo } from '@/functions/paymentCard'
import type { OrderPayment } from '@/interfaces/order'
import { HStack, Image, Text, VStack } from '@chakra-ui/react'

const OrderPayment = ({ orderPayment }: { orderPayment: OrderPayment }) => {
    return (
        <VStack gap={2} alignItems="start">
            <Text fontWeight="bold">Payment info</Text>
            <HStack>
                <Image src={String(getCardBrandLogo(orderPayment.cardBrand))} width="30px" />
                <Text>**** **** **** {orderPayment.cardLast4}</Text>
            </HStack>
            <Text>{orderPayment.cardHolderName}</Text>
            <Text>{orderPayment.cardExpiresMonth}/{orderPayment.cardExpiresYear}</Text>
        </VStack>
    )
}

export default OrderPayment