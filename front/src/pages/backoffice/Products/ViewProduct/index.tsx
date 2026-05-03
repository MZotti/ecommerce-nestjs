import CardContainer from "@/components/CardContainer";
import TextDisplay from "@/components/TextDisplay";
import { useLazyGetProduct } from "@/hooks/products";
import type { State } from "@/state/reducers";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
    const { id } = useParams();
    const { data, refetch: getProduct, isFetching } = useLazyGetProduct(Number(id));

    const products = useSelector(({ products }: State) => products)
    const storeProduct = products.find(product => product.id == Number(id)) || null;
    const product = storeProduct || data;

    useEffect(() => {
        if (storeProduct === null) {
            getProduct();
        }
    }, [])

    return (
        <CardContainer title="Product">
            <VStack gap={4}>
                <TextDisplay label="Name" value={product?.name} />
                <TextDisplay label="Category" value={product?.category.name} />
                <TextDisplay label="Description" value={product?.description} />
                <TextDisplay label="Price" value={product?.price} />
                <TextDisplay label="Stock" value={product?.stock} />
            </VStack>
        </CardContainer>
    )
}

export default ViewProduct