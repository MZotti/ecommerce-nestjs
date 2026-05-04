import type { OrderItem as TOrderType } from '@/interfaces/order'
import { Flex, Text, VStack } from '@chakra-ui/react'

const OrderItem = ({ item }: { item: TOrderType }) => {
    return (
        <Flex w="full">
            <VStack gap={4} w="full" alignItems="start">
                <Text fontSize="md">{item.quantity} x {item.productId}</Text>
                <Text fontSize="md">USD$ {item.price}</Text>
            </VStack>
        </Flex>
    )
}

export default OrderItem