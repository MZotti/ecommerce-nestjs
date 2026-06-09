import { LightMode } from '@/components/chakra-ui/color-mode'
import { Flex, Spinner } from '@chakra-ui/react'

const LoadingScreen = () => {
    return (
        <LightMode>
            <Flex
                w="full"
                h="full"
                position="relative"
                justifyContent="center"
                alignItems="center"
                backgroundColor="gray.200"
            >
                <Spinner size="xl" color="orange" colorPalette="orange" />
            </Flex>
        </LightMode>
    )
}

export default LoadingScreen