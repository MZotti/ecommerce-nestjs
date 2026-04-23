import { Flex, Text } from '@chakra-ui/react'

import Paginator from '../Paginator'
import { useTableContext } from 'contexts/TableContext'

const TableFooter = () => {
    const { currentPage, perPage, totalItems } = useTableContext()

    const firstItem = 1
    const lastItem = currentPage * perPage

    return (
        <Flex w="full" justifyContent="space-between" mt={6}>
            <Text fontSize="sm">
                Exibindo os registros {`${firstItem}-${lastItem}`} de um total de {totalItems}
            </Text>
            <Paginator />
        </Flex>
    )
}

export default TableFooter
