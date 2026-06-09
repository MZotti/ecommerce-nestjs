import CardContainer from "@/components/CardContainer"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import type Customer from "@/interfaces/customer"
import { GridItem, Separator, Spinner, Text, VStack } from "@chakra-ui/react"
import ListOrder from "./ListOrder"
import { useGetCustomerOrders } from "@/hooks/backoffice/orders"
import type Order from "@/interfaces/order"

const CustomerOrders = () => {
    const { data: customer } = useFetchDataContext<Customer>();
    const { data, isFetching } = useGetCustomerOrders(customer?.user.id, 1, 30);
    const orders = data?.data || [];

    return (
        <GridItem>
            <CardContainer title="Orders" fullW>
                <VStack gap={4} position="relative" separator={<Separator w="full" variant="solid" />}>
                    {
                        isFetching ?
                            <Spinner size="lg" />
                            :
                            orders?.length === 0 ?
                                <Text fontWeight="bold">No order registered</Text>
                                :
                                orders?.map((ord: Order) => <ListOrder order={ord} />)
                    }
                </VStack>
            </CardContainer>
        </GridItem>
    )
}

export default CustomerOrders