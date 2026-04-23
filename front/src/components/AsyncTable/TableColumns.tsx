import { Table } from '@chakra-ui/react'
import { useTableContext } from 'contexts/TableContext'

const TableColumns = () => {
    const { columns, withRowActions } = useTableContext()

    return (
        <Table.Header>
            <Table.Row>
                {
                    withRowActions && <Table.ColumnHeader key={0}></Table.ColumnHeader>
                }
                {columns.map(column => (
                    <Table.ColumnHeader key={column.label}>{column.label}</Table.ColumnHeader>
                ))}
            </Table.Row>
        </Table.Header>
    )
}

export default TableColumns
