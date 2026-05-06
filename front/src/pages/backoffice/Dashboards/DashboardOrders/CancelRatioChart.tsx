import ChartContainer from '@/components/ChartContainer'
import { Badge, Center, GridItem, Stat } from '@chakra-ui/react'

const CancelRatioChart = () => {
    return (
        <GridItem>
            <ChartContainer title="Cancel Ratio">
                <Center m="auto">
                    <Stat.Root>
                        <Stat.ValueText>12%</Stat.ValueText>
                        <Badge colorPalette="red" variant="plain" px="0">
                            <Stat.DownIndicator />
                            0.3%
                        </Badge>
                    </Stat.Root>
                </Center>
            </ChartContainer>
        </GridItem>
    )
}

export default CancelRatioChart