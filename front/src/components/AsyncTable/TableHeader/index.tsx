import { Flex, HStack, VStack } from '@chakra-ui/react'

import Search from './Search'
import Filters from './Filters'
import PerPage from './PerPage'
import Paginator from '../Paginator'

const TableHeader = () => {
    return (
        <VStack w="full" mb={6} gap={4}>
            <Flex w="full" justifyContent="space-between">
                <HStack>
                    <Search />
                    <Filters />
                </HStack>
                <HStack>
                    <PerPage />
                </HStack>
            </Flex>
            <Flex w="full" justifyContent="end">
                <Paginator />
            </Flex>
        </VStack>
    )
}

export default TableHeader
