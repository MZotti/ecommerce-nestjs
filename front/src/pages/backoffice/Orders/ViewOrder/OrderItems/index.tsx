import CardContainer from "@/components/CardContainer";
import { useFetchDataContext } from "@/contexts/FetchDataContext";
import { Flex, GridItem, Text, VStack } from "@chakra-ui/react";
import OrderItem from "./OrderItem";
import LoadingItem from "./LoadingItem";
import type Order from "@/interfaces/order";
import { PackageIcon } from "@phosphor-icons/react";

const OrderItems = () => {
    const { data: order, isLoading } = useFetchDataContext<Order>();

    return (
        <GridItem>
            <CardContainer fullW>
                <Flex gap={2} alignItems="center" mb={8}>
                    <PackageIcon size={22} weight="bold" />
                    <Text fontWeight="bold">Items</Text>
                </Flex>
                <VStack gap={2} justifyContent="start">
                    {
                        isLoading ? <LoadingItem />
                        : order?.items.map((item: any) => <OrderItem item={item} />)
                    }
                </VStack>
            </CardContainer>
        </GridItem>
    )
}

export default OrderItems