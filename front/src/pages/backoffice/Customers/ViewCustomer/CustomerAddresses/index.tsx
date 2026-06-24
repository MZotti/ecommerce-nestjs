import CardContainer from "@/components/CardContainer"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import type Customer from "@/interfaces/customer"
import { Flex, GridItem, Separator, Text, VStack } from "@chakra-ui/react"
import ListAddress from "./ListAddress"
import { MailboxIcon } from "@phosphor-icons/react"

const CustomerAddresses = () => {
    const { data: customer } = useFetchDataContext<Customer>()

    return (
        <GridItem>
            <CardContainer fullW>
                <Flex gap={2} alignItems="center" mb={8}>
                    <MailboxIcon size={22} weight="bold" />
                    <Text fontWeight="bold">Addresses</Text>
                </Flex>
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