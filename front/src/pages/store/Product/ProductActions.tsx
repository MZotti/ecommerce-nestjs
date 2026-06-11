import AddToCartButton from '@/components/AddToCartButton';
import SimpleCard from '@/components/SimpleCard'
import { useFetchDataContext } from '@/contexts/FetchDataContext'
import { formatPriceToCurrency } from '@/functions/textFormat';
import type Product from '@/interfaces/product';
import { cartCreator } from '@/state';
import { Button, Flex, Separator, SkeletonText, Text, VStack } from '@chakra-ui/react'
import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const ProductActions = () => {
    const { data: product, isLoading } = useFetchDataContext<Product>();
    const [quantity, setQuantity] = useState<number>(1);

    const dispatch = useDispatch()
    const { addToCartAction } = bindActionCreators(cartCreator, dispatch)

    const onChangeQuantity = (amount: number) => {
        let newQuantity = quantity + amount;

        if (newQuantity < 1)
            newQuantity = 1;
        else if (newQuantity > product?.stock)
            newQuantity = product?.stock

        setQuantity(newQuantity);
    }

    const addProductToCart = () => {
        addToCartAction({
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity
        })
    }

    return (
        <Flex flexGrow={1}>
            <SimpleCard>
                <VStack gap={2} alignItems="start">
                    <SkeletonText loading={isLoading}>
                        <Text fontSize="sm" color="fg.muted">{product?.category?.name}</Text>
                    </SkeletonText>
                    <SkeletonText loading={isLoading}>
                        <Text>{product?.name}</Text>
                    </SkeletonText>
                    <SkeletonText loading={isLoading}>
                        <Text fontWeight="bold" fontSize="lg">USD {formatPriceToCurrency(product?.price)}</Text>
                    </SkeletonText>
                    <SkeletonText loading={isLoading}>
                        <Text fontSize="sm" color={product?.stock > 0 ? "green" : "red"}>{product?.stock > 0 ? "Stock available" : "Out of stock"}</Text>
                    </SkeletonText>
                    <Flex gap={1} w="full">
                        <Button flexGrow="1" colorPalette="orange" onClick={() => onChangeQuantity(-1)}>
                            <MinusCircleIcon size="16px" />
                        </Button>
                        <Flex px={4} flexGrow="1" justifyContent="center" alignItems="center">
                            <Text fontWeight="bold">{quantity}</Text>
                        </Flex>
                        <Button flexGrow="1" colorPalette="orange" onClick={() => onChangeQuantity(1)}>
                            <PlusCircleIcon size="16px" />
                        </Button>
                        <Flex flexGrow="5">
                            <AddToCartButton product={product} quantity={quantity} />
                        </Flex>
                    </Flex>
                    <Button w="full" colorPalette="orange" onClick={addProductToCart}>Buy now</Button>
                    <Separator w="full" variant="solid" my={6} />
                    <Text>TODO Shipping</Text>
                </VStack>
            </SimpleCard>
        </Flex>
    )
}

export default ProductActions