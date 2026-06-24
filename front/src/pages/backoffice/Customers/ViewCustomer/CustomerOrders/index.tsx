import CardContainer from "@/components/CardContainer"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import type Customer from "@/interfaces/customer"
import { Flex, GridItem, Separator, Spinner, Text, VStack } from "@chakra-ui/react"
import ListOrder from "./ListOrder"
import { useGetCustomerOrders } from "@/hooks/backoffice/orders"
import type Order from "@/interfaces/order"
import { ShippingContainerIcon } from "@phosphor-icons/react"

const CustomerOrders = () => {
    const { data: customer } = useFetchDataContext<Customer>();
    const { data, isFetching } = useGetCustomerOrders(customer?.user.id, 1, 30);
    const orders = data?.data || [];

    return (
        <GridItem>
            <CardContainer fullW>
                <Flex gap={2} alignItems="center" mb={8}>
                    <ShippingContainerIcon size={22} weight="bold" />
                    <Text fontWeight="bold">Orders</Text>
                </Flex>
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