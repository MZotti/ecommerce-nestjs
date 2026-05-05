
import { FetchDataContext } from "@/contexts/FetchDataContext";
import { useGetProduct } from "@/hooks/products";
import type { State } from "@/state/reducers";
import { Grid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductInsights from "./ProductInsights";

const ViewProduct = () => {
    const { id } = useParams();

    const products = useSelector(({ products }: State) => products)
    const storedProduct = products.find(product => product.id == Number(id)) || null;
    const { data, isFetching } = useGetProduct(Number(id), storedProduct);

    const product = storedProduct || data;

    return (
        <FetchDataContext value={{
            data: product,
            isLoading: isFetching
        }}>
            <Grid
                w="full"
                h="full"
                templateColumns="repeat(1, 1fr 3fr)" gap={2}
            >
                <ProductDetails />
                <ProductInsights />
            </Grid>
        </FetchDataContext>
    )
}

export default ViewProduct