import { SimpleGrid } from '@chakra-ui/react'
import PaymentMethodChart from './PaymentMethodChart'
import OrdersPerMonth from './OrdersPerMonth'
import OrdersStatusChart from './OrdersStatusChart'
import ShippingTimeChart from './ShippingTimeChart'
import CancelRatioChart from './CancelRatioChart'

const DashboardOrders = () => {
    return (
        <SimpleGrid w="full" columns={4} gap={4} gridTemplateRows="max-content">
            <PaymentMethodChart />
            <OrdersPerMonth />
            <OrdersStatusChart />
            <ShippingTimeChart />
            <CancelRatioChart />
        </SimpleGrid>
    )
}

export default DashboardOrders