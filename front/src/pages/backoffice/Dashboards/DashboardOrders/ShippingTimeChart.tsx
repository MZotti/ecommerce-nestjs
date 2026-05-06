import ChartContainer from '@/components/ChartContainer'
import { Badge, Center, GridItem, Stat } from '@chakra-ui/react'

const ShippingTimeChart = () => {
    return (
        <GridItem>
            <ChartContainer title="Shipping Time">
                <Center m="auto">
                    <Stat.Root>
                        <Stat.ValueText>20 hours</Stat.ValueText>
                        <Badge colorPalette="red" variant="plain" px="0">
                            <Stat.DownIndicator />
                            1.9%
                        </Badge>
                    </Stat.Root>
                </Center>
            </ChartContainer>
        </GridItem>
    )
}

export default ShippingTimeChart