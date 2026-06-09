import SimpleCard from '@/components/SimpleCard'
import { useFetchDataContext } from '@/contexts/FetchDataContext'
import type Product from '@/interfaces/product'
import { Flex, HStack, Image } from '@chakra-ui/react'

const ProductImages = () => {
    const { data: product } = useFetchDataContext<Product>();

    return (
        <Flex flexGrow={2}>
            <SimpleCard>
                <Flex justifyContent="center">
                    <Image
                        src={product?.imageUrl}
                        maxW="500px"
                    />
                </Flex>
                <HStack w="full" justifyContent="center" gap={4}>
                    <Image
                        src={product?.imageUrl}
                        w="80px"
                    />
                    <Image
                        src={product?.imageUrl}
                        w="80px"
                    />
                    <Image
                        src={product?.imageUrl}
                        w="80px"
                    />
                    <Image
                        src={product?.imageUrl}
                        w="80px"
                    />

                </HStack>
            </SimpleCard>
        </Flex>
    )
}

export default ProductImages