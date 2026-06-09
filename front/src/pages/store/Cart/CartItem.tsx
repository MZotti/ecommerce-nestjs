import { formatPriceToCurrency } from '@/functions/textFormat'
import type { OrderItem } from '@/interfaces/order'
import { Flex, Image, Text, VStack } from '@chakra-ui/react'

const CartItem = ({ item }: { item: OrderItem }) => {
    return (
        <Flex w="full" p={12} gap={8} alignItems="center">
            <Image
                src={item.productImageUrl}
                width="100px"
            />
            <Flex w="full" justifyContent="space-between">
                <VStack alignItems="start">
                    <Text>{item.productName}</Text>
                    <Text fontSize="sm">USD {formatPriceToCurrency(item.price)}</Text>
                </VStack>
                <Text>{item.quantity}</Text>
                <Text fontWeight="bold">USD {formatPriceToCurrency(item.price * item.quantity)}</Text>
            </Flex>
        </Flex>
    )
}

export default CartItem