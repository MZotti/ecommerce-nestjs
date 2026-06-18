import { calculateCartTotalPrice } from '@/functions/cart'
import { formatPriceToCurrency } from '@/functions/textFormat'
import type Order from '@/interfaces/order'
import { Flex, Text, VStack } from '@chakra-ui/react'

const OrderResume = ({ order }: { order: Order }) => {
    return (
        <Flex flexGrow={1}>
            <VStack w="full" gap={2} alignItems="end">
                <Text>Payment method: {order?.paymentMethod}</Text>
                <Text>Total products: USD {formatPriceToCurrency(calculateCartTotalPrice(order?.items))}</Text>
                <Text>Shipping: USD $0.00</Text>
                <Text>Discount: USD $0.00</Text>
                <Text fontWeight="bold">Total: USD {formatPriceToCurrency(order?.total)}</Text>
            </VStack>
        </Flex>
    )
}

export default OrderResume