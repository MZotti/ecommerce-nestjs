import StockStatusDisplay from '@/components/StockStatusDisplay'
import { Text } from '@chakra-ui/react'
import { FilterField } from 'enums/filter'
import { dateFormat } from "functions/date"
import type Filter from 'interfaces/filter'
import type TableColumn from "interfaces/table"

const columns: TableColumn[] = [
    {
        label: 'Name',
        acessor: 'name',
    },
    {
        label: 'Category',
        acessor: 'category',
        customCell: value => <Text>{value.name}</Text>,
    },
    {
        label: 'Price (USD$)',
        acessor: 'price',
    },
    {
        label: 'Stock',
        acessor: 'stock',
        customCell: value => <StockStatusDisplay stock={value} />
    },
    {
        label: 'Created at',
        acessor: 'createdAt',
        customCell: value => <Text>{dateFormat(value, 'dd/MM/yyyy')}</Text>,
    },
]

const filterFields: Filter[] = [
    {
        name: 'createdAt',
        label: 'Data de Cadastro',
        fieldType: FilterField.DATE,
        colSpan: 1,
    },
    {
        name: 'deleted_at',
        label: 'Data de Exclusão',
        fieldType: FilterField.DATE,
        colSpan: 1,
    },
]

export {
    columns,
    filterFields
}