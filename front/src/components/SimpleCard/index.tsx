import { Card, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    title?: string
    children: React.ReactNode
}

const SimpleCard = ({ title = "", children }: Props) => {
    return (
        <Card.Root w="full">
            <Card.Header hidden={title == ""}>
                <Text fontSize="md" fontWeight="bold">{title}</Text>
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card.Root>
    )
}

export default SimpleCard