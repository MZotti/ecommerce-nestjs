import { Table } from '@chakra-ui/react'
import LoadingTable from './LoadingTable'
import { useTableContext } from 'contexts/TableContext'
import TableRow from './TableRow'
import EmptyData from './EmptyData'

const TableBody = () => {
    const { data, isLoading } = useTableContext()

    return (
        <Table.Body>
            {isLoading ? (
                <LoadingTable label="users" />
            ) : data.length === 0 ? (
                <EmptyData />
            ) : (
                <>
                    {data.map((row, key) => <TableRow key={key} data={row} />)}
                </>
            )}
        </Table.Body>
    )
}

export default TableBody
