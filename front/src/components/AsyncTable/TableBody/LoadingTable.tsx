import { useTableContext } from '@/contexts/TableContext'
import { Center, Progress, Table, Text, VStack } from '@chakra-ui/react'

const LoadingTable = () => {
    const { label } = useTableContext()

    return (
        <Table.Row>
            <Table.Cell colSpan={99}>
                <Center p={16}>
                    <VStack>
                        <Text fontSize="md">Loading {label}</Text>
                        <Progress.Root w="400px" value={null}>
                            <Progress.Track h="6px">
                                <Progress.Range />
                            </Progress.Track>
                        </Progress.Root>
                    </VStack>
                </Center>
            </Table.Cell>
        </Table.Row>
    )
}

export default LoadingTable
