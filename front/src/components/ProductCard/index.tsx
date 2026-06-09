import { formatPriceToCurrency } from "@/functions/textFormat";
import type Product from "@/interfaces/product";
import { cartCreator } from "@/state";
import { Box, Button, Card, Center, HStack, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch()
    const { addToCartAction } = bindActionCreators(cartCreator, dispatch)

    const [isHovering, setIsHovering] = useState(false);

    const onMouseEnter = () => {
        setIsHovering(true);
    }

    const onMouseLeave = () => {
        setIsHovering(false);
    }

    const addProductToCart = () => {
        addToCartAction({
            productId: product.id,
            productName: product.name,
            productImageUrl: product.imageUrl,
            price: product.price,
            quantity: 1
        })
    }

    return (
        <LinkBox as="article">
            <Card.Root minH="500px" cursor="pointer" size="md" variant={"elevated"} backgroundColor="gray.100" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} transition="0.2s ease all">
                <Image
                    src={product?.imageUrl}
                    p="4"
                />
                <Card.Body color="fg.muted">
                    <LinkOverlay asChild>
                        <Link to={`/product/${product.slug}`}></Link>
                    </LinkOverlay>
                    <Text color="black" fontSize="md" mt="auto">5.0</Text>
                    <Text color="black" fontSize="md">{product.name}</Text>
                    <Text color="black" fontSize="lg" fontWeight="bold" >USD {formatPriceToCurrency(product.price)}</Text>
                </Card.Body>
                <Card.Footer gap="2">
                    <Box w="full">
                        <HStack w="full">
                            <Button variant="solid" w="full" colorPalette="orange" colorScheme="light" onClick={addProductToCart}><ShoppingCartIcon size="14px" /> Add to cart</Button>
                        </HStack>
                    </Box>
                </Card.Footer>
            </Card.Root>
        </LinkBox >
    )
}

export default ProductCard