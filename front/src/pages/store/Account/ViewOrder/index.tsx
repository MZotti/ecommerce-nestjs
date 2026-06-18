import { OrderStatusColor } from '@/enums/order'
import { useGetOrder } from '@/hooks/store/orders';
import { Badge, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'
import OrderItem from './OrderItem';
import type { OrderItem as TOrderItem } from '@/interfaces/order';
import { dateFormat } from '@/functions/date';
import OrderShipping from './OrderShipping';
import OrderPayment from './OrderPayment';
import OrderResume from './OrderResume';

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
                                <OrderShipping order={order} />
                                {
                                    order.orderPayment && <OrderPayment orderPayment={order.orderPayment} />
                                }
                            </VStack>
                        </Flex>
                        <OrderResume order={order} />
                    </>
            }
        </Flex>
    )
}

export default ViewOrder