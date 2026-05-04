import CardContainer from "@/components/CardContainer";
import { useFetchDataContext } from "@/contexts/FetchDataContext";
import { GridItem, Timeline } from "@chakra-ui/react";
import TimelineItem from "./TimelineItem";
import LoadingItem from "./LoadingItem";

const OrderTimeline = () => {
    const { data: order, isLoading } = useFetchDataContext();

    return (
        <GridItem>
            <CardContainer title="Timeline">
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