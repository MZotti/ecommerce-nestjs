import CardContainer from "@/components/CardContainer"
import DataDisplay from "@/components/DataDisplay"
import OrderStatusDisplay from "@/components/OrderStatusDisplay"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import { dateFormat } from "@/functions/date"
import { Grid, GridItem, Separator, Text, VStack } from "@chakra-ui/react"
import OrderActions from "../OrderActions"
import { formatPriceToCurrency } from "@/functions/textFormat"
import type Order from "@/interfaces/order"
import { useLazyGetUser } from "@/hooks/backoffice/users"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import OrderPayment from "./OrderPayment"

const OrderDetails = () => {
    const { data: order } = useFetchDataContext<Order>();
    const { refetch, data: user } = useLazyGetUser(order?.userId);

    useEffect(() => {
        if (order !== null) {
            refetch()
        }
    }, [order])

    return (
        <GridItem>
            <CardContainer fullW>
                <VStack gap={4} position="relative">
                    <OrderActions />
                    <DataDisplay label="Customer">
                        <Link to={`../customers/${user?.customer?.id}`}>
                            <Text fontSize="md" textAlign="left">{user?.name}</Text>
                        </Link>
                    </DataDisplay>
                    <Grid
                        w="full"
                        templateColumns="repeat(2, 1fr)" gap={4}
                    >
                        <DataDisplay label="Status">
                            <Text fontSize="md"><OrderStatusDisplay status={order?.status} /></Text>
                        </DataDisplay>
                        <DataDisplay label="Total">
                            <Text fontSize="md">USD {formatPriceToCurrency(order?.total)}</Text>
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
                        <DataDisplay label="Street">
                            <Text fontSize="md">{order?.shippingStreet}</Text>
                        </DataDisplay>
                        <DataDisplay label="Zip Code">
                            <Text fontSize="md">{order?.shippingZipCode}</Text>
                        </DataDisplay>
                        <DataDisplay label="Number">
                            <Text fontSize="md">{order?.shippingNumber}</Text>
                        </DataDisplay>
                        <DataDisplay label="Complement">
                            <Text fontSize="md">{order?.shippingComplement || 'N/A'}</Text>
                        </DataDisplay>
                        <DataDisplay label="Neighborhood">
                            <Text fontSize="md">{order?.shippingNeighborhood}</Text>
                        </DataDisplay>
                        <DataDisplay label="City">
                            <Text fontSize="md">{order?.shippingCity}</Text>
                        </DataDisplay>
                        <DataDisplay label="State">
                            <Text fontSize="md">{order?.shippingState}</Text>
                        </DataDisplay>
                        <DataDisplay label="Country">
                            <Text fontSize="md">{order?.shippingCountry}</Text>
                        </DataDisplay>
                    </Grid>
                </VStack>
                <Separator my={8} />
                <OrderPayment />
            </CardContainer>
        </GridItem>
    )
}

export default OrderDetails