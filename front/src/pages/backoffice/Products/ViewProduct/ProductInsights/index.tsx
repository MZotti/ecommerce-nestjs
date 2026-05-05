import CardContainer from "@/components/CardContainer"
import { Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react"
import { SpeedometerIcon } from "@phosphor-icons/react"
import Last30Days from "./Last30Days"

const ProductInsights = () => {
    return (
        <GridItem>
            <CardContainer fullW>
                <Flex gap={2} alignItems="center" mb={8}>
                    <SpeedometerIcon size={22} weight="bold" />
                    <Text fontWeight="bold"> Insights</Text>
                </Flex>
                <Flex w="full">
                    <SimpleGrid w="full" columns={3} gap={8}>
                        <Last30Days />
                        <Last30Days />
                        <Last30Days />
                        <Last30Days />
                    </SimpleGrid>
                </Flex>
            </CardContainer>
        </GridItem>
    )
}

export default ProductInsights