import { Box, Table } from '@chakra-ui/react'

import TableHeader from './TableHeader'
import TableColumns from './TableColumns'
import TableBody from './TableBody'
import TableFooter from './TableFooter'

const AsyncTable = () => {
    return (
        <Box mb="auto">
            <TableHeader />
            <Table.Root size="md" interactive striped>
                <TableColumns />
                <TableBody />
            </Table.Root>
            <TableFooter />
        </Box>
    )
}

export default AsyncTable
