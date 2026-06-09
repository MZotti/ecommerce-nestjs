import { SimpleGrid } from '@chakra-ui/react'
import ProductCard from '../ProductCard'
import LoadingProductCard from '../ProductCard/LoadingProductCard'
import type Product from '@/interfaces/product'

interface Props {
    products: Product[]
    isLoading: boolean
}

const ProductsGrid = ({ products, isLoading }: Props) => {
    return (
        <SimpleGrid columns={[5]} gap="40px">
            {
                isLoading &&
                <>
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                    <LoadingProductCard />
                </>
            }
            {
                !isLoading && products.map(product => <ProductCard product={product} key={product.id} />)
            }
        </SimpleGrid>
    )
}

export default ProductsGrid