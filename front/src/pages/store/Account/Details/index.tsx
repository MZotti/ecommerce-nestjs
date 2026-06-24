import type { State } from '@/state/reducers'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const Details = () => {
    const auth = useSelector(({ shared }: State) => shared.auth)
    const { user } = auth || {}

    return (
        <Flex w="full">
            <VStack gap={4} alignItems="start">
                <VStack gap={2} alignItems="start">
                    <Text fontWeight="bold">Nome completo</Text>
                    <Text>{user?.name}</Text>
                </VStack>
                <VStack gap={2} alignItems="start">
                    <Text fontWeight="bold">E-mail</Text>
                    <Text>{user?.email}</Text>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Details