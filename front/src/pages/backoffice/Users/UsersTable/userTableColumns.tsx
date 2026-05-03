import ActiveDisplay from '@/components/ActiveDisplay'
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
        label: 'E-mail',
        acessor: 'email',
    },
    {
        label: 'Active',
        acessor: 'isActive',
        customCell: value => <ActiveDisplay isActive={value} />,
    },
    {
        label: 'Role',
        acessor: 'role',
        customCell: value => <Text>{value.name}</Text>,
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