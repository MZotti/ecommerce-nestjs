import { Flex, Spinner } from "@chakra-ui/react"

const LoadingScreen = () => {
    return (
        <Flex
            w="full"
            h="full"
            position="relative"
            justifyContent="center"
            alignItems="center"
        >
            <Spinner size="xl" />
        </Flex>
    )
}

export default LoadingScreen