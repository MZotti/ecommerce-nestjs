import ActiveDisplay from '@/components/ActiveDisplay'
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

const filterFields: Filter[] = [
    {
        name: 'createdAt',
        label: 'Data de Cadastro',
        fieldType: FilterField.DATE,
        colSpan: 1,
    },
]

export {
    columns,
    filterFields
}