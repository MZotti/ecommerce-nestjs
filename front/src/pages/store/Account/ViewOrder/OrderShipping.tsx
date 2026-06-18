import type TOrder from '@/interfaces/order'
import { Box, Text } from '@chakra-ui/react'

const OrderShipping = ({ order }: { order: TOrder }) => {
    return (
        <Box>
            <Text fontWeight="bold">Shipping info</Text>
            <Text>Zip Code: {order.shippingZipCode}</Text>
            <Text>Street: {order.shippingStreet} - {order.shippingNumber}</Text>
            <Text>Complement: {order.shippingComplement}</Text>
            <Text>Neighborhood: {order.shippingNeighborhood}</Text>
            <Text>City: {order.shippingCity}</Text>
            <Text>State: {order.shippingState}</Text>
            <Text>Country: {order.shippingCountry}</Text>
        </Box>
    )
}

export default OrderShipping