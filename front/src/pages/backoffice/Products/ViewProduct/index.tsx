import CardContainer from "@/components/CardContainer";
import DataDisplay from "@/components/DataDisplay";
import { FetchDataContext } from "@/contexts/FetchDataContext";
import { useGetProduct } from "@/hooks/products";
import type { State } from "@/state/reducers";
import { Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
    const { id } = useParams();

    const products = useSelector(({ products }: State) => products)
    const storedProduct = products.find(product => product.id == Number(id)) || null;
    const { data, isFetching } = useGetProduct(Number(id), storedProduct);

    const product = storedProduct || data;

    return (
        <CardContainer title="Product">
            <FetchDataContext value={{
                data: product,
                isLoading: isFetching
            }}>
                <VStack gap={4}>
                    <DataDisplay label="Name">
                        <Text fontSize="md">{product?.name}</Text>
                    </DataDisplay>
                    <DataDisplay label="Name">
                        <Text fontSize="md">{product?.category.name}</Text>
                    </DataDisplay>
                    <DataDisplay label="Name">
                        <Text fontSize="md">{product?.description}</Text>
                    </DataDisplay>
                    <DataDisplay label="Name">
                        <Text fontSize="md">{product?.price}</Text>
                    </DataDisplay>
                    <DataDisplay label="Name">
                        <Text fontSize="md">{product?.stock}</Text>
                    </DataDisplay>
                </VStack>
            </FetchDataContext>
        </CardContainer>
    )
}

export default ViewProduct