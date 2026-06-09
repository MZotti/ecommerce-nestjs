import { formatPriceToCurrency } from '@/functions/textFormat'
import type { OrderItem as TOrderItem } from '@/interfaces/order'
import { Flex, Image, Text, VStack } from '@chakra-ui/react'

const OrderItem = ({ item }: { item: TOrderItem }) => {
    return (
        <Flex>
            <Image
                src={item.productImageUrl}
                w="120px"
                h="120px"
                m="4"
            />
            <VStack alignItems="start">
                <Text>{item.productName}</Text>
                <Text>USD {formatPriceToCurrency(item.price)}</Text>
            </VStack>
        </Flex>
    )
}

export default OrderItem