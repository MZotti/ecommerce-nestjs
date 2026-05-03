import AsyncTable from "@/components/AsyncTable"
import TableContainer from "@/components/TableContainer"
import { TableProvider } from "@/contexts/TableContext"
import { usePagination } from "@/hooks/pagination"
import { useDeleteUser, useGetUsers } from "@/hooks/users"
import type { State } from "@/state/reducers"
import { useSelector } from "react-redux"

import { columns, filterFields } from './userTableColumns'
import { Button, Flex } from "@chakra-ui/react"
import { PlusIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useState } from "react"
import TableActions from "./TableActions"

const Actions = <Flex>
    <Button colorPalette="green" asChild size="sm">
        <Link to="create">
            <PlusIcon size="12px" />
            Create
        </Link>
    </Button>
</Flex>

const UsersTable = () => {
    const users = useSelector(({ users }: State) => users)

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

    const { data: fetchData, isFetching } = useGetUsers(currentPage, perPage, search, filters)
    const { meta } = fetchData || {};

    const deleteAction = useDeleteUser();

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
        <TableContainer label="Users" actions={Actions}>
            <TableProvider
                value={{
                    data: users,
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
                    canUpdate: true,
                    deleteAction: deleteAction,
                    rowsSelected: rows,
                    setRowsSelected,
                    clearRowsSelected
                }}
            >
                <AsyncTable />
                <TableActions />
            </TableProvider>
        </TableContainer>
    )
}

export default UsersTable