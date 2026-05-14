import AsyncTable from "@/components/AsyncTable"
import TableContainer from "@/components/TableContainer"
import { TableProvider } from "@/contexts/TableContext"
import { usePagination } from "@/hooks/backoffice/pagination"
import type { State } from "@/state/reducers"
import { useSelector } from "react-redux"

import { columns, filterFields } from './orderTableColumns'
import { Button, Flex } from "@chakra-ui/react"
import { PlusIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useState } from "react"
import TableActions from "./TableActions"
import { useGetOrders } from "@/hooks/backoffice/orders"

const Actions = <Flex>
    <Button colorPalette="green" asChild size="sm">
        <Link to="create">
            <PlusIcon size="12px" />
            Create
        </Link>
    </Button>
</Flex>

const OrdersTable = () => {
    const orders = useSelector(({ orders }: State) => orders)

    const {
        currentPage,
        perPage,
        search,
        filters,
        setCurrentPage,
        setPerPage,
        setSearch,
        setFilters,
    } = usePagination()

    const { data: fetchData, isFetching } = useGetOrders(currentPage, perPage, search, filters)
    const { meta } = fetchData || {};

    const [rows, setRows] = useState<number[]>([])

    const setRowsSelected = (id: number) => {
        if (rows.includes(id)) {
            setRows(rows.filter(r => r !== id))
        } else {
            setRows([...rows, id])
        }
    }

    const clearRowsSelected = () => setRows([]);

    return (
        <TableContainer label="Orders" actions={Actions}>
            <TableProvider
                value={{
                    data: orders,
                    label: 'Orders',
                    columns,
                    currentPage: meta?.page || 1,
                    perPage: meta?.perPage || 30,
                    totalItems: meta?.total || 0,
                    lastPage: meta?.lastPage || 1,
                    isLoading: isFetching,
                    filterFields,
                    setCurrentPage,
                    setPerPage,
                    setSearch,
                    setFilters,
                    linkRow: true,
                    canUpdate: false,
                    rowsSelected: rows,
                    setRowsSelected,
                    clearRowsSelected
                }}
            >
                <AsyncTable />
            </TableProvider>
        </TableContainer>
    )
}

export default OrdersTable