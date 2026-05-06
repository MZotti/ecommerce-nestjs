import { dateFormat } from '@/functions/date'
import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { StarIcon } from '@phosphor-icons/react'

const Rating = () => {
    return (
        <Flex>
            <VStack>
                <Text fontWeight="bold">User name</Text>
                <Text>Comment</Text>
                <HStack>
                    <Text fontWeight="bold">4.8</Text>
                    <StarIcon size={22} weight="fill" />
                    <StarIcon size={22} weight="fill" />
                    <StarIcon size={22} weight="fill" />
                    <StarIcon size={22} weight="fill" />
                    <StarIcon size={22} weight="duotone" />
                </HStack>
                <Text>{dateFormat(new Date())}</Text>
            </VStack>
        </Flex>
    )
}

export default Rating