import ActiveDisplay from '@/components/ActiveDisplay'
import DatePickerInput from '@/components/Inputs/DatePickerInput'
import SelectInput from '@/components/Inputs/SelectInput'
import TextInput from '@/components/Inputs/TextInput'
import { Role } from '@/enums/roles'
import { Text } from '@chakra-ui/react'
import { dateFormat } from "functions/date"
import type TableColumn from "interfaces/table"
import type React from 'react'

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

const filterFields: React.ReactNode[] = [
    <SelectInput
        key='roleId'
        id='roleId'
        label='Role'
        colSpan={2}
        options={[
            {
                label: Role.ADMIN,
                value: 1
            },
            {
                label: Role.MANAGER,
                value: 2
            },
            {
                label: Role.OPERATIONAL,
                value: 3
            },
            {
                label: Role.ANALYST,
                value: 4
            },
        ]}
    />,
    <SelectInput
        key='isActive'
        id='isActive'
        label='Active'
        colSpan={2}
        options={[
            {
                label: 'Active',
                value: 'true'
            },
            {
                label: 'Inactive',
                value: 'false'
            },
        ]}
    />,
    <DatePickerInput
        key='createdAtStart'
        id='createdAtStart'
        label='Created At Start'
        colSpan={2}
    />,
    <DatePickerInput
        key='createdAtEnd'
        id='createdAtEnd'
        label='Created At End'
        colSpan={2}
    />
    // {
    //     name: 'createdAt',
    //     label: 'Data de Cadastro',
    //     fieldType: FilterField.DATE,
    //     colSpan: 1,
    // },
    // {
    //     name: 'deleted_at',
    //     label: 'Data de Exclusão',
    //     fieldType: FilterField.DATE,
    //     colSpan: 1,
    // },
]

export {
    columns,
    filterFields
}