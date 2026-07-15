import { SimpleGrid, VStack } from '@chakra-ui/react'
import PaymentMethodChart from './PaymentMethodChart'
import OrdersPerMonth from './OrdersPerMonth'
import OrdersStatusChart from './OrdersStatusChart'
import ShippingTimeChart from './ShippingTimeChart'
import CancelRatioChart from './CancelRatioChart'
import { useAnalyticsFilters, useGetOrdersAnalytics } from '@/hooks/backoffice/analytics'
import DashboardLoading from '../DashboardLoading'
import DashboardFilters from '../DashboardFilters'
import FilterFields from "./FilterFields"

const DashboardOrders = () => {
    const { filters, setFilters } = useAnalyticsFilters();
    const { data, isFetching } = useGetOrdersAnalytics(filters);

    return (
        <VStack w="full">
            <DashboardFilters filterFields={FilterFields} setFilters={setFilters} />
            <SimpleGrid w="full" columns={4} gap={4} gridTemplateRows="max-content">
                {
                    isFetching || data === undefined ?
                        <DashboardLoading />
                        :
                        <>
                            <OrdersPerMonth data={data.ordersPerMonth} />
                            <PaymentMethodChart data={data.paymentMethods} />
                            <OrdersStatusChart data={data.ordersStatus} />
                            <ShippingTimeChart />
                            <CancelRatioChart />
                        </>
                }
            </SimpleGrid>
        </VStack>
    )
}

export default DashboardOrders