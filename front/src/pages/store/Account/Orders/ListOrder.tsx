import { OrderStatusColor } from '@/enums/order'
import { dateFormat } from '@/functions/date'
import { formatPriceToCurrency } from '@/functions/textFormat'
import type TOrder from '@/interfaces/order'
import { Badge, Box, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ListOrder = ({ order }: { order: TOrder }) => {
    return (
        <Box w="full" position="relative">
            <Link to={`./${order.id}`}>
                <VStack alignItems="start" gap={4}>
                    <Text>Order #{order.id} - {dateFormat(order.createdAt, "dd/MM/yyyy HH:mm:ss")}</Text>
                    <Badge colorPalette={OrderStatusColor[order.status]} size="lg">{order.status}</Badge>
                    <Text fontWeight="bold">Total: USD {formatPriceToCurrency(order.total)}</Text>
                </VStack>
            </Link>
        </Box>
    )
}

export default ListOrder