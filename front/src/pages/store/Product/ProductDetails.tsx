import SimpleCard from '@/components/SimpleCard'
import { useFetchDataContext } from '@/contexts/FetchDataContext'
import type Product from '@/interfaces/product';
import { Box, Flex, SkeletonText, Text } from '@chakra-ui/react'

const ProductDetails = () => {
    const { data: product, isLoading } = useFetchDataContext<Product>();

    return (
        <Flex w="full">
            <SimpleCard title='Details'>
                <SkeletonText noOfLines={5} />
                <Text>
                    {product?.description}
                </Text>
            </SimpleCard>
        </Flex>
    )
}

export default ProductDetails