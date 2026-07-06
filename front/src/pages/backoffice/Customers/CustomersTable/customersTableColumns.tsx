import { Text } from '@chakra-ui/react'
import { FilterField } from 'enums/filter'
import { dateFormat } from "functions/date"
import type Filter from 'interfaces/filter'
import type TableColumn from "interfaces/table"

const columns: TableColumn[] = [
    {
        label: 'Name',
        acessor: 'user',
        customCell: value => <Text>{value.name}</Text>,
    },
    {
        label: 'E-mail',
        acessor: 'user',
        customCell: value => <Text>{value.email}</Text>,
    },
    {
        label: 'Document',
        acessor: 'document',
    },
    {
        label: 'Phone',
        acessor: 'phone',
    },
    {
        label: 'Created at',
        acessor: 'createdAt',
        customCell: value => <Text>{dateFormat(value, 'dd/MM/yyyy')}</Text>,
    },
]

const filterFields: React.ReactNode[] = [
]

export {
    columns,
    filterFields
}