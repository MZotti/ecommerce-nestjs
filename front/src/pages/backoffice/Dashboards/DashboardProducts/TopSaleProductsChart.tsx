import ChartContainer from "@/components/ChartContainer"
import type { BestSaleProduct } from "@/interfaces/analytics"
import { BarList, useChart, type BarListData } from "@chakra-ui/charts"
import { GridItem } from "@chakra-ui/react"

const TopSaleProducts = ({ data }: { data: BestSaleProduct[]}) => {
    const chart = useChart<BarListData>({
        sort: { by: "value", direction: "desc" },
        data,
        series: [{ name: "name", color: "teal.subtle" }],
    })

    return (
        <GridItem colSpan={{ base: 2 }}>
            <ChartContainer title="Top sale products" >
                <BarList.Root chart={chart}>
                    <BarList.Content>
                        <BarList.Label title="Product" flex="1">
                            <BarList.Bar />
                        </BarList.Label>
                        <BarList.Label title="Sales" titleAlignment="end">
                            <BarList.Value />
                        </BarList.Label>
                    </BarList.Content>
                </BarList.Root>
            </ChartContainer>
        </GridItem>
    )
}

export default TopSaleProducts