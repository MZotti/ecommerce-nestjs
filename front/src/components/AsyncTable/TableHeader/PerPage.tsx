import { Box, createListCollection, Portal, Select } from '@chakra-ui/react'
import { useTableContext } from 'contexts/TableContext'

const options = createListCollection({
    items: [
        { label: '10', value: '10' },
        { label: '15', value: '15' },
        { label: '30', value: '30' },
        { label: '50', value: '50' },
        { label: '100', value: '100' },
    ],
})

const PerPage = () => {
    const { perPage, setPerPage } = useTableContext()

    const onChangePage = (value: string[]) => {
        const numbeValue = Number(value[0])
        setPerPage(numbeValue)
    }

    return (
        <Box>
            <Select.Root
                collection={options}
                size="sm"
                width="120px"
                value={[perPage.toString()]}
                onValueChange={({ value }) => onChangePage(value)}
            >
                <Select.HiddenSelect />
                <Select.Label>Items per page</Select.Label>
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {options.items.map(option => (
                                <Select.Item item={option} key={option.value}>
                                    {option.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </Box>
    )
}

export default PerPage
