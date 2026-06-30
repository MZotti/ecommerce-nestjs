
import { useGetOrders } from '@/hooks/store/orders';
import { Separator, VStack } from '@chakra-ui/react';
import type TOrder from '@/interfaces/order';
import ListOrder from './ListOrder';
import { useSelector } from 'react-redux';
import type { State } from '@/state/reducers';
import LoadingBar from '@/components/LoadingBar';

const Orders = () => {
    const orders = useSelector(({ store }: State) => store.orders)
    const { isFetching } = useGetOrders(orders);

    if (isFetching)
        return (
            <LoadingBar label="orders" />
        )

    return (
        <VStack gap={6} separator={<Separator w="full" variant="solid" />}>
            {
                orders.map((el: TOrder) => <ListOrder order={el} />)
            }
        </VStack>
    )
}

export default Orders