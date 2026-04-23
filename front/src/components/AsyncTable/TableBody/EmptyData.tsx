import { Center, Table, Text } from '@chakra-ui/react'

const EmptyData = () => {
    return (
        <Table.Row>
            <Table.Cell colSpan={99}>
                <Center p={16}>
                    <Text fontSize="md">Sem dados para serem exibidos.</Text>
                </Center>
            </Table.Cell>
        </Table.Row>
    )
}

export default EmptyData
