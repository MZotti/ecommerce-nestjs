import { Card, Skeleton } from "@chakra-ui/react"

const LoadingProductCard = () => {
    return (
        <Card.Root cursor="pointer" size="md" variant={"elevated"} backgroundColor="gray.100" minH="491.61px">
            <Skeleton w="full" h="full" />
        </Card.Root>
    )
}

export default LoadingProductCard