import ActiveDisplay from '@/components/ActiveDisplay'
import DatePickerInput from '@/components/Inputs/DatePickerInput'
import SelectInput from '@/components/Inputs/SelectInput'
import OrderStatusDisplay from '@/components/OrderStatusDisplay'
import { formatPriceToCurrency } from '@/functions/textFormat'
import { Text } from '@chakra-ui/react'
import { FilterField } from 'enums/filter'
import { dateFormat } from "functions/date"
import type Filter from 'interfaces/filter'
import type TableColumn from "interfaces/table"

const columns: TableColumn[] = [
    {
        label: 'Customer',
        acessor: 'userId',
    },
    {
        label: 'Country',
        acessor: 'shippingCountry',
    },
    {
        label: 'State',
        acessor: 'shippingState',
    },
    {
        label: 'City',
        acessor: 'shippingCity',
    },
    {
        label: 'Total (USD)',
        acessor: 'total',
        customCell: value => <Text>{formatPriceToCurrency(value)}</Text>
    },
    {
        label: 'Items Quant.',
        acessor: 'items',
        customCell: value => <Text>{value.length}</Text>,
    },
    {
        label: 'Payment Method',
        acessor: 'paymentMethod',
    },
    {
        label: 'Status',
        acessor: 'status',
        customCell: value => <OrderStatusDisplay status={value} />,
    },
    {
        label: 'Created at',
        acessor: 'createdAt',
        customCell: value => <Text>{dateFormat(value, 'dd/MM/yyyy')}</Text>,
    },
]

const filterFields: React.ReactNode[] = [
    <SelectInput
        key='shippingCountry'
        id='shippingCountry'
        label='Country'
        colSpan={2}
        options={[
            {
                label: 'BR',
                value: 'BR'
            },
        ]}
    />,
    <SelectInput
        key='shippingState'
        id='shippingState'
        label='State'
        colSpan={2}
        options={[
            {
                label: 'RS',
                value: 'RS'
            },
            {
                label: 'EE',
                value: 'EE'
            },
        ]}
    />,
    <SelectInput
        key='status'
        id='status'
        label='Status'
        colSpan={2}
        options={[
            {
                label: 'Pending',
                value: 'PENDING'
            },
            {
                label: 'Paid',
                value: 'PAID'
            },
            {
                label: 'Shipped',
                value: 'SHIPPED'
            },
            {
                label: 'Canceled',
                value: 'CANCELED'
            },
            {
                label: 'Finished',
                value: 'FINISHED'
            },
        ]}
    />,
    <SelectInput
        key='paymentMethod'
        id='paymentMethod'
        label='Payment Method'
        colSpan={2}
        options={[
            {
                label: 'Pix',
                value: 'PIX'
            },
            {
                label: 'Payment Order',
                value: 'PAYMENT_ORDER'
            },
            {
                label: 'Credit',
                value: 'CREDIT'
            },
            {
                label: 'Debit',
                value: 'DEBIT'
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
]

export {
    columns,
    filterFields
}