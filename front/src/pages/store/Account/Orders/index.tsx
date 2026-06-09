
import { useGetOrders } from '@/hooks/store/orders';
import { Flex, Separator, Spinner, VStack } from '@chakra-ui/react';
import type TOrder from '@/interfaces/order';
import ListOrder from './ListOrder';

const Orders = () => {
    const { data, isFetching } = useGetOrders();
    const { data: orders } = data || {}

    return (
        <VStack gap={6} separator={<Separator w="full" variant="solid" />}>
            {
                isFetching ?
                    <Flex>
                        <Spinner size="lg" />
                    </Flex>
                    : orders?.map((el: TOrder) => <ListOrder order={el} />)
            }
        </VStack>
    )
}

export default Orders