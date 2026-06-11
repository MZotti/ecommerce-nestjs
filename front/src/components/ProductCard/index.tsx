import { formatPriceToCurrency } from "@/functions/textFormat";
import type Product from "@/interfaces/product";
import { Box, Card, HStack, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import { useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {

    const [isHovering, setIsHovering] = useState(false);

    const onMouseEnter = () => {
        setIsHovering(true);
    }

    const onMouseLeave = () => {
        setIsHovering(false);
    }

    return (
        <LinkBox as="article">
            <Card.Root minH="500px" cursor="pointer" size="md" variant={"elevated"} backgroundColor="white" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} transition="0.2s ease all">
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
                            <AddToCartButton product={product} />
                        </HStack>
                    </Box>
                </Card.Footer>
            </Card.Root>
        </LinkBox >
    )
}

export default ProductCard