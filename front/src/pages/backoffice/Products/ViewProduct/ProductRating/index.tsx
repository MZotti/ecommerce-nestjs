import CardContainer from '@/components/CardContainer'
import { Flex, GridItem, HStack, Text, VStack } from '@chakra-ui/react'
import { StarIcon } from '@phosphor-icons/react'
import Ratings from './Ratings'

const ProductRating = () => {
    return (
        <GridItem>
            <CardContainer fullW>
                <Flex gap={2} alignItems="center" mb={8}>
                    <StarIcon size={22} weight="bold" />
                    <Text fontWeight="bold"> Rating</Text>
                </Flex>
                <VStack gap={4} w="full" alignItems="start">
                    <Text>Average Rating</Text>
                    <HStack>
                        <Text fontWeight="bold">4.8</Text>
                        <StarIcon size={22} weight="fill" />
                        <StarIcon size={22} weight="fill" />
                        <StarIcon size={22} weight="fill" />
                        <StarIcon size={22} weight="fill" />
                        <StarIcon size={22} weight="duotone" />
                    </HStack>
                    <Ratings />
                </VStack>
            </CardContainer>
        </GridItem>
    )
}

export default ProductRating