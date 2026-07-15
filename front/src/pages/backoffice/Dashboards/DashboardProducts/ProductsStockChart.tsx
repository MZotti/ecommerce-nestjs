import ChartContainer from "@/components/ChartContainer"
import type { ProductsStock } from "@/interfaces/analytics"
import { Chart, useChart } from "@chakra-ui/charts"
import { GridItem } from "@chakra-ui/react"
import { Legend, Pie, PieChart, Sector, Tooltip } from "recharts"

const ProductsStockChart = ({ data }: { data: ProductsStock }) => {
    const chart = useChart({
        data: [
            { name: "Good", value: data.good, color: "green.solid" },
            { name: "Low", value: data.low, color: "yellow.solid" },
            { name: "Empty", value: data.empty, color: "red.solid" },
        ],
    })

    return (
        <GridItem colSpan={{ base: 1 }}>
            <ChartContainer title="Products Stock" >
                <Chart.Root height="16rem" chart={chart}>
                    <PieChart responsive>
                        <Legend content={<Chart.Legend />} />
                        <Tooltip
                            cursor={false}
                            animationDuration={100}
                            content={<Chart.Tooltip hideLabel />}
                        />
                        <Pie
                            isAnimationActive={false}
                            data={chart.data}
                            dataKey={chart.key("value")}
                            nameKey="name"
                            stroke="none"
                            shape={(props) => (
                                <Sector {...props} fill={chart.color(props.payload!.color)} />
                            )}
                        />
                    </PieChart>
                </Chart.Root>
            </ChartContainer>
        </GridItem>
    )
}

export default ProductsStockChart