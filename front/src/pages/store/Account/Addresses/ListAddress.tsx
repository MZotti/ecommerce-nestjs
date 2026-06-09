import type Address from '@/interfaces/address'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const ListAddress = ({ address }: { address: Address }) => {
    return (
        <Box w="full">
            <Text>{address.name}</Text>
            <Text>{address.zipCode}</Text>
            <Text>{address.street} - {address.number}</Text>
            <Text>{address.complement}</Text>
            <Text>{address.neighborhood}</Text>
            <Text>{address.city}</Text>
            <Text>{address.state}</Text>
            <Text>{address.country}</Text>
        </Box>
    )
}

export default ListAddress