import CardContainer from "@/components/CardContainer"
import DataDisplay from "@/components/DataDisplay"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import { dateFormat } from "@/functions/date"
import type Customer from "@/interfaces/customer"
import { Grid, GridItem, Text, VStack } from "@chakra-ui/react"

const CustomerDetails = () => {
    const { data: customer, isLoading } = useFetchDataContext<Customer>();

    return (
        <GridItem>
            <CardContainer fullW>
                <VStack gap={4} position="relative">
                    <DataDisplay label="Name">
                        <Text fontSize="md">{customer?.user.name}</Text>
                    </DataDisplay>
                    <Grid
                        w="full"
                        templateColumns="repeat(2, 1fr)" gap={4}
                    >
                        <DataDisplay label="E-Mail">
                            <Text fontSize="md">{customer?.user.email}</Text>
                        </DataDisplay>
                        <DataDisplay label="Document">
                            <Text fontSize="md">{customer?.document}</Text>
                        </DataDisplay>
                        <DataDisplay label="Phone">
                            <Text fontSize="md">{customer?.phone}</Text>
                        </DataDisplay>
                        <DataDisplay label="Birth Date">
                            <Text fontSize="md">{dateFormat(customer?.birthDate)}</Text>
                        </DataDisplay>
                    </Grid>
                </VStack>
            </CardContainer>
        </GridItem>
    )
}

export default CustomerDetails