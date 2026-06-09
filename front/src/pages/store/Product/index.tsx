import { Flex, VStack } from '@chakra-ui/react'
import ProductImages from './ProductImages'
import ProductActions from './ProductActions'
import ProductDetails from './ProductDetails'
import ProductReviews from './ProductReviews'
import { useParams } from 'react-router-dom'
import { useGetProduct } from '@/hooks/store/products'
import { FetchDataContext } from '@/contexts/FetchDataContext'

const Product = () => {
    const { slug } = useParams();
    const { data, isFetching } = useGetProduct(slug || "");

    return (
        <FetchDataContext value={{
            data,
            isLoading: isFetching
        }}>
            <VStack w="full" px="400px" gap={2}>
                <Flex w="full" gap={2}>
                    <ProductImages />
                    <ProductActions />
                </Flex>
                <Flex></Flex>
                <ProductDetails />
                <ProductReviews />
            </VStack>
        </FetchDataContext>
    )
}

export default Product