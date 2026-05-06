import { Flex, Separator, Text, VStack } from '@chakra-ui/react'
import Rating from './Rating'

const Ratings = () => {
    return (
        <Flex w="full" direction="column">
            <Text> All ratings and comments</Text>
            <VStack w="full" gap={4} separator={<Separator w="full" variant="solid" />}>
                <Rating />
                <Rating />
                <Rating />
                <Rating />
            </VStack>
        </Flex>
    )
}

export default Ratings