import { OrderStatusColor } from '@/enums/order'
import { calculateCartTotalPrice } from '@/functions/cart';
import { formatPriceToCurrency } from '@/functions/textFormat';
import { useGetOrder } from '@/hooks/store/orders';
import { Badge, Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'
import OrderItem from './OrderItem';
import type { OrderItem as TOrderItem } from '@/interfaces/order';
import { dateFormat } from '@/functions/date';

const ViewOrder = () => {
    const { orderId } = useParams();
    const { data: order, isFetching } = useGetOrder(Number(orderId))

    return (
        <Flex w="full">
            {
                isFetching ?
                    <Flex>
                        <Spinner size="lg" />
                    </Flex>
                    :
                    <>
                        <Flex flexGrow={3}>
                            <VStack w="full" alignItems="start" gap={6}>
                                <Text>Order #{order?.id} - {dateFormat(order?.createdAt, "dd/MM/yyyy HH:mm:ss")}</Text>
                                <Text fontSize="lg" fontWeight="bold">Status: <Badge colorPalette={OrderStatusColor[order?.status]} size="lg">{order?.status}</Badge></Text>
                                {
                                    order?.items.map((item: TOrderItem) => <OrderItem key={item.productId} item={item} />)
                                }
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
                            </VStack>
                        </Flex>
                        <Flex flexGrow={1}>
                            <VStack w="full" gap={2} alignItems="end">
                                <Text>Payment method: {order?.paymentMethod}</Text>
                                <Text>Total products: USD {formatPriceToCurrency(calculateCartTotalPrice(order?.items))}</Text>
                                <Text>Shipping: USD $0.00</Text>
                                <Text>Discount: USD $0.00</Text>
                                <Text fontWeight="bold">Total: USD {formatPriceToCurrency(order?.total)}</Text>
                            </VStack>
                        </Flex>
                    </>
            }
        </Flex>
    )
}

export default ViewOrder