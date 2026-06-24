import CardContainer from "@/components/CardContainer";
import { useFetchDataContext } from "@/contexts/FetchDataContext";
import { Flex, GridItem, Text, Timeline } from "@chakra-ui/react";
import TimelineItem from "./TimelineItem";
import LoadingItem from "./LoadingItem";
import { ListDashesIcon } from "@phosphor-icons/react";
import type Order from "@/interfaces/order";

const OrderTimeline = () => {
    const { data: order, isLoading } = useFetchDataContext<Order>();

    return (
        <GridItem>
            <CardContainer fullW >
                <Flex gap={2} alignItems="center" mb={8}>
                    <ListDashesIcon size={22} weight="bold" />
                    <Text fontWeight="bold">Timeline</Text>
                </Flex>
                <Timeline.Root>
                    {
                        isLoading ? <LoadingItem />
                            :
                            <>
                                <TimelineItem title="Order created" datetime={new Date()} />
                                <TimelineItem title="Payment confirmed" datetime={new Date()} />
                                <TimelineItem title="Order shipped" datetime={new Date()} />
                            </>
                    }
                </Timeline.Root>
            </CardContainer>
        </GridItem>
    )
}

export default OrderTimeline