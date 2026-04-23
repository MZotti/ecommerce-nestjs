/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Table } from '@chakra-ui/react'
import { useTableContext } from 'contexts/TableContext'

interface Props {
    data: any
}

const TableRow = ({ data }: Props) => {
    const { columns, withRowActions, rowsSelected, setRowsSelected } = useTableContext()

    return (
        <Table.Row>
            {
                withRowActions &&
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
        </Table.Row>
    )
}

export default TableRow
