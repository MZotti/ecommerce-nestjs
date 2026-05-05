import CardContainer from "@/components/CardContainer";
import { useFetchDataContext } from "@/contexts/FetchDataContext";
import { GridItem, VStack } from "@chakra-ui/react";
import OrderItem from "./OrderItem";
import LoadingItem from "./LoadingItem";

const OrderItems = () => {
    const { data: order, isLoading } = useFetchDataContext();

    return (
        <GridItem>
            <CardContainer fullW title="Items">
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