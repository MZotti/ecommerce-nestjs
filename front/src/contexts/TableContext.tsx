/* eslint-disable react-refresh/only-export-components */
// TableContext.tsx
import type Filter from 'interfaces/filter'
import type TableColumn from 'interfaces/table'
import { createContext, useContext } from 'react'

export interface TableContextProps<T = unknown> {
    data: T[]
    columns: TableColumn[]
    isLoading: boolean
    currentPage: number
    perPage: number
    totalPages: number
    totalItems: number
    filterFields: Filter[]
    setCurrentPage: (args1: number) => void
    setPerPage: (args1: number) => void
    setSearch: (args1: string) => void
    setFilters: (args1: string) => void
    withRowActions?: boolean
    rowsSelected: number[]
    setRowsSelected: (args1: number) => void
    clearRowsSelected: () => void
}

export const TableContext = createContext<TableContextProps<unknown> | undefined>(undefined)

export const useTableContext = <T,>() => {
    const context = useContext(TableContext) as TableContextProps<T> | undefined
    if (!context) {
        throw new Error('useTableContext deve ser usado dentro de um <TableProvider>')
    }
    return context
}

interface TableProviderProps<T> {
    value: TableContextProps<T>
    children: React.ReactNode
}

export const TableProvider = <T,>({ value, children }: TableProviderProps<T>) => {
    return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}
