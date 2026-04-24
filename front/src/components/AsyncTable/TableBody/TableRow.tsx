/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Table } from '@chakra-ui/react'
import { useTableContext } from 'contexts/TableContext'
import RowActions from './RowActions'

interface Props {
    data: any
}

const TableRow = ({ data }: Props) => {
    const { columns, canUpdate, canDelete, customRowActions, multiRowActions, rowsSelected, setRowsSelected } = useTableContext()
    const hasActions = canUpdate || canDelete || customRowActions;

    const rowId = data['id'] || 0;

    return (
        <Table.Row>
            {
                multiRowActions &&
                <Table.Cell w="20px">
                    <Checkbox.Root
                        checked={rowsSelected.includes(data.id)}
                        onCheckedChange={() => setRowsSelected(data.id)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>
                </Table.Cell>
            }
            {columns.map((column, key) =>
                column.customCell !== undefined ? (
                    <Table.Cell key={key}>{column?.customCell(data[column.acessor])}</Table.Cell>
                ) : (
                    <Table.Cell key={key}>{data[column.acessor]}</Table.Cell>
                ),
            )}
            {
                hasActions && <Table.Cell w="20px" key={columns.length}><RowActions id={rowId} /></Table.Cell>
            }
        </Table.Row>
    )
}

export default TableRow
