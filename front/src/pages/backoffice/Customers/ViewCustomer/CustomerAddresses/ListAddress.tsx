import DataDisplay from '@/components/DataDisplay'
import type Address from '@/interfaces/address'
import { Grid, Text } from '@chakra-ui/react'

const ListAddress = ({ address }: { address: Address }) => {
    return (
        <Grid
            w="full"
            templateColumns="repeat(2, 1fr)" gap={4}
        >
            <DataDisplay label="Street">
                <Text fontSize="md">{address.state}</Text>
            </DataDisplay>
            <DataDisplay label="Zip Code">
                <Text fontSize="md">{address.zipCode}</Text>
            </DataDisplay>
            <DataDisplay label="Number">
                <Text fontSize="md">{address.number}</Text>
            </DataDisplay>
            <DataDisplay label="Complement">
                <Text fontSize="md">{address.complement || 'N/A'}</Text>
            </DataDisplay>
            <DataDisplay label="Neighborhood">
                <Text fontSize="md">{address.neighborhood}</Text>
            </DataDisplay>
            <DataDisplay label="City">
                <Text fontSize="md">{address.city}</Text>
            </DataDisplay>
            <DataDisplay label="State">
                <Text fontSize="md">{address.state}</Text>
            </DataDisplay>
            <DataDisplay label="Country">
                <Text fontSize="md">{address.country}</Text>
            </DataDisplay>
        </Grid>
    )
}

export default ListAddress