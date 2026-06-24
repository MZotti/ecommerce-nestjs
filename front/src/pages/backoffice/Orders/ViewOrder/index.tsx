import { FetchDataContext } from "@/contexts/FetchDataContext";
import { useGetOrder } from "@/hooks/backoffice/orders";
import type { State } from "@/state/reducers";
import { Grid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import OrderItems from "./OrderItems";
import OrderTimeline from "./OrderTimeline";

const ViewOrder = () => {
    const { id } = useParams();

    const orders = useSelector(({ backoffice }: State) => backoffice.orders)
    const storedOrder = orders.find(order => order.id == Number(id)) || null;
    const { data, isFetching } = useGetOrder(Number(id), storedOrder);

    const order = storedOrder || data;

    return (
        <FetchDataContext value={{
            data: order,
            isLoading: isFetching
        }}>
            <Grid
                w="full"
                h="full"
                templateColumns="repeat(1, 1fr 2fr 2fr)" gap={2}
            >
                <OrderDetails />
                <OrderItems />
                <OrderTimeline />
            </Grid>
        </FetchDataContext>
    )
}

export default ViewOrder