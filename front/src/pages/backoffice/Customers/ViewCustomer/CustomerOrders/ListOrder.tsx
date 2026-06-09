import { dateFormat } from "@/functions/date"
import { formatPriceToCurrency } from "@/functions/textFormat"
import type Order from "@/interfaces/order"
import { Box, Text, VStack } from "@chakra-ui/react"

const ListOrder = ({ order }: { order: Order }) => {
    return (
        <Box w="full">
            <VStack w="full" alignItems="start">
                <Text fontWeight="bold">Order #{order.id}</Text>
                <Text fontWeight="bold">Created at: {dateFormat(order.createdAt)}</Text>
                <Text>Status: {order.status}</Text>
                <Text>Payment Method: {order.paymentMethod}</Text>
                <Text color="green">Total: USD {formatPriceToCurrency(order.total)}</Text>
            </VStack>
        </Box>
    )
}

export default ListOrder