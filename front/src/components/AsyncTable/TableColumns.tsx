import { Table } from '@chakra-ui/react'
import { useTableContext } from 'contexts/TableContext'

const TableColumns = () => {
    const { columns, canUpdate, canDelete, customRowActions, multiRowActions } = useTableContext()
    const hasActions = canUpdate || canDelete || customRowActions;

    return (
        <Table.Header>
            <Table.Row>
                {
                    multiRowActions && <Table.ColumnHeader key={0}></Table.ColumnHeader>
                }
                {columns.map(column => (
                    <Table.ColumnHeader key={column.label}>{column.label}</Table.ColumnHeader>
                ))}
                {
                    hasActions && <Table.ColumnHeader key={columns.length}></Table.ColumnHeader>
                }
            </Table.Row>
        </Table.Header>
    )
}

export default TableColumns
