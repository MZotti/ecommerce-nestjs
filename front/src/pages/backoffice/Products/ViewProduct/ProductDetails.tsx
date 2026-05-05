import CardContainer from '@/components/CardContainer';
import DataDisplay from '@/components/DataDisplay';
import StockStatusDisplay from '@/components/StockStatusDisplay';
import { useFetchDataContext } from '@/contexts/FetchDataContext'
import { GridItem, Text, VStack } from '@chakra-ui/react'
import ProductActions from './ProductActions';

const ProductDetails = () => {
    const { data: product } = useFetchDataContext();

    return (
        <GridItem>
            <CardContainer fullW>
                <VStack gap={4} position="relative">
                    <ProductActions />
                    <DataDisplay label="Name">
                        <Text fontSize="md">{product?.name}</Text>
                    </DataDisplay>
                    <DataDisplay label="Category">
                        <Text fontSize="md">{product?.category.name}</Text>
                    </DataDisplay>
                    <DataDisplay label="Description">
                        <Text fontSize="md">{product?.description}</Text>
                    </DataDisplay>
                    <DataDisplay label="Price">
                        <Text fontSize="md">{product?.price}</Text>
                    </DataDisplay>
                    <DataDisplay label="Stock">
                        <StockStatusDisplay stock={product?.stock} />
                    </DataDisplay>
                </VStack>
            </CardContainer>
        </GridItem>
    )
}

export default ProductDetails