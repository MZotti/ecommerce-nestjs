/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Table } from '@chakra-ui/react'
import { useTableContext } from 'contexts/TableContext'
import RowActions from './RowActions'
import { useNavigate } from 'react-router-dom'

interface Props {
    data: any
}

const TableRow = ({ data }: Props) => {
    const navigate = useNavigate();
    const { columns, linkRow, canUpdate, canDelete, customRowActions, multiRowActions, rowsSelected, setRowsSelected } = useTableContext()
    const hasActions = canUpdate || canDelete || customRowActions;

    const rowId = data['id'] || 0;

    const onClick = () => {
        if (linkRow) {
            navigate(`${rowId}`);
        }
    }

    return (
        <Table.Row cursor={linkRow ? 'pointer' : 'auto'} >
            {
                multiRowActions &&
                <Table.Cell w="20px" pointerEvents="none">
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
                    <Table.Cell onClick={onClick} key={key}>{data[column.acessor]}</Table.Cell>
                ),
            )}
            {
                hasActions && <Table.Cell pointerEvents="none" w="20px" key={columns.length}><RowActions id={rowId} /></Table.Cell>
            }
        </Table.Row>
    )
}

export default TableRow
