import CardContainer from "@/components/CardContainer"
import DataDisplay from "@/components/DataDisplay"
import OrderStatusDisplay from "@/components/OrderStatusDisplay"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import { dateFormat } from "@/functions/date"
import { Grid, GridItem, Separator, Text, VStack } from "@chakra-ui/react"
import OrderActions from "./OrderActions"

const OrderDetails = () => {
    const { data: order } = useFetchDataContext();

    return (
        <GridItem>
            <CardContainer fullW>
                <VStack gap={4} position="relative">
                    <OrderActions />
                    <DataDisplay label="Customer">
                        <Text fontSize="md" textAlign="left">{order?.userId}</Text>
                    </DataDisplay>
                    <Grid
                        w="full"
                        templateColumns="repeat(2, 1fr)" gap={4}
                    >
                        <DataDisplay label="Status">
                            <Text fontSize="md"><OrderStatusDisplay status={order?.status} /></Text>
                        </DataDisplay>
                        <DataDisplay label="Total">
                            <Text fontSize="md">USD$ {order?.total}</Text>
                        </DataDisplay>
                        <DataDisplay label="Items Quantity">
                            <Text fontSize="md">{order?.items.length}</Text>
                        </DataDisplay>
                        <DataDisplay label="Payment Method">
                            <Text fontSize="md">{order?.paymentMethod}</Text>
                        </DataDisplay>
                        <DataDisplay label="Created at">
                            <Text fontSize="md">{dateFormat(order?.createdAt, "dd/MM/yyyy HH:mm:ss")}</Text>
                        </DataDisplay>
                    </Grid>
                </VStack>
                <Separator my={8} />
                <VStack gap={4} w="full">
                    <Text fontSize="md" fontWeight="bold" textAlign="left">Shipping details</Text>
                    <Grid
                        w="full"
                        templateColumns="repeat(2, 1fr)" gap={4}
                    >
                        <DataDisplay label="Address">
                            <Text fontSize="md"></Text>
                        </DataDisplay>
                    </Grid>
                </VStack>
            </CardContainer>
        </GridItem>
    )
}

export default OrderDetails