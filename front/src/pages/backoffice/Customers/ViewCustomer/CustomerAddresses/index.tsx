import CardContainer from "@/components/CardContainer"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import type Customer from "@/interfaces/customer"
import { GridItem, Separator, Text, VStack } from "@chakra-ui/react"
import ListAddress from "./ListAddress"

const CustomerAddresses = () => {
    const { data: customer } = useFetchDataContext<Customer>()

    return (
        <GridItem>
            <CardContainer title="Addresses" fullW>
                <VStack gap={4} position="relative" separator={<Separator w="full" variant="solid" />}>
                    {
                        customer?.user.addresses?.length === 0 ?
                            <Text fontWeight="bold">No address registered</Text>
                            :
                            customer?.user.addresses?.map(addr => <ListAddress address={addr} />)
                    }
                </VStack>
            </CardContainer>
        </GridItem>
    )
}

export default CustomerAddresses