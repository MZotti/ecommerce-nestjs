import DatePickerInput from '@/components/Inputs/DatePickerInput'
import SelectInput from '@/components/Inputs/SelectInput'
import SliderInput from '@/components/Inputs/SliderInput'
import StockStatusDisplay from '@/components/StockStatusDisplay'
import { formatPriceToCurrency } from '@/functions/textFormat'
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
        customCell: value => <Text>{formatPriceToCurrency(value)}</Text>
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

const filterFields: React.ReactNode[] = [
    <SelectInput
        key='category'
        id='category'
        label='Category'
        options={[
            {
                label: 'Graphic Card',
                value: 'graphic-card'
            },
            {
                label: 'CPU',
                value: 'cpus'
            },
            {
                label: 'Mother Board',
                value: 'mother-board'
            },
            {
                label: 'RAM',
                value: 'ram'
            },
            {
                label: 'Storage',
                value: 'storage'
            },
            {
                label: 'Power Supply',
                value: 'power-supply'
            },
            {
                label: 'CPU Cooler',
                value: 'cpi-cooler'
            },
            {
                label: 'Case',
                value: 'case'
            },
            {
                label: 'Case Fan',
                value: 'case-fan'
            },
        ]}
        colSpan={2}
    />,
    <SelectInput
        key='stock'
        id='stock'
        label='Stock'
        options={[
            {
                label: 'Good',
                value: 'good'
            },
            {
                label: 'Low',
                value: 'low'
            },
            {
                label: 'Empty',
                value: 'empty'
            },
        ]}
        colSpan={2}
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
    />,
    <SliderInput
        key='price'
        id='price'
        label='Price Range'
        colSpan={4}
    />
]

export {
    columns,
    filterFields
}