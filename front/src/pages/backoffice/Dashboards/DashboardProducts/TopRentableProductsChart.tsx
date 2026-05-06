import ChartContainer from "@/components/ChartContainer"
import { BarList, useChart, type BarListData } from "@chakra-ui/charts"
import { GridItem } from "@chakra-ui/react"

const TopRentableProductsChart = () => {
    const chart = useChart<BarListData>({
        sort: { by: "value", direction: "desc" },
        data: [
            { name: "RTX 5070", value: 1000 },
            { name: "RTX 4060", value: 980 },
            { name: "Ryzen 7 7800X3D", value: 500 },
            { name: "Ryzen 5 5500X", value: 420 },
            { name: "Gigabyte 650 Gaming Plus", value: 400 },
        ],
        series: [{ name: "name", color: "teal.subtle" }],
    })

    return (
        <GridItem colSpan={{ base: 2 }}>
            <ChartContainer title="Top rentable products" >
                <BarList.Root chart={chart}>
                    <BarList.Content>
                        <BarList.Label title="Product" flex="1">
                            <BarList.Bar />
                        </BarList.Label>
                        <BarList.Label title="Sales" titleAlignment="end">
                            <BarList.Value valueFormatter={(value: any) => `USD$ ${value}`} />
                        </BarList.Label>
                    </BarList.Content>
                </BarList.Root>
            </ChartContainer>
        </GridItem>
    )
}

export default TopRentableProductsChart