import { Box, Table } from '@chakra-ui/react'

import TableHeader from './TableHeader'
import TableColumns from './TableColumns'
import TableBody from './TableBody'
import TableFooter from './TableFooter'

const AsyncTable = () => {
    return (
        <Box>
            <TableHeader />
            <Table.Root size="md" interactive>
                <TableColumns />
                <TableBody />
            </Table.Root>
            <TableFooter />
        </Box>
    )
}

export default AsyncTable
