import { Card, Flex, Text } from "@chakra-ui/react"

interface Props {
    label: string
    actions?: React.ReactNode
    children: React.ReactNode
}

const TableContainer = ({ label, actions, children }: Props) => {
    return (
        <Card.Root width="full" variant="outline">
            <Card.Header>
                <Card.Title>
                    <Flex w="full" justifyContent="space-between">
                        <Text fontSize="md">
                            {label}
                        </Text>
                        {actions}
                    </Flex>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card.Root>
    )
}

export default TableContainer