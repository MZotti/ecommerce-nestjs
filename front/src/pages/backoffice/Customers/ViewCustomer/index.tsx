import { FetchDataContext } from "@/contexts/FetchDataContext";
import { useGetCustomer } from "@/hooks/backoffice/customers";
import type { State } from "@/state/reducers";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomerDetails from "./CustomerDetails";
import CustomerAddresses from "./CustomerAddresses";
import CustomerOrders from "./CustomerOrders";
import { Grid } from "@chakra-ui/react";

const ViewCustomer = () => {
    const { id } = useParams();

    const customers = useSelector(({ backoffice }: State) => backoffice.customers)
    const storedCustomer = customers.find(customer => customer.id == Number(id)) || null;
    const { data, isFetching } = useGetCustomer(Number(id), storedCustomer);

    const customer = storedCustomer ?? data;

    return (
        <FetchDataContext value={{
            data: customer,
            isLoading: isFetching
        }}>
            <Grid
                w="full"
                h="full"
                templateColumns="repeat(1, 1fr 1fr 2fr)" gap={2}
            >
                <CustomerDetails />
                <CustomerAddresses />
                <CustomerOrders />
            </Grid>
        </FetchDataContext>
    )
}

export default ViewCustomer