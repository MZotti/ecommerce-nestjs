import ChartContainer from '@/components/ChartContainer'
import { Chart, useChart } from "@chakra-ui/charts"
import { GridItem } from '@chakra-ui/react'
import { Legend, Pie, PieChart, Sector, Tooltip } from "recharts"

const OrdersStatusChart = () => {
    const chart = useChart({
        data: [
            { name: "Pending", value: 500, color: "orange.solid" },
            { name: "Paid", value: 540, color: "yellow.solid" },
            { name: "Shipped", value: 600, color: "blue.solid" },
            { name: "Finished", value: 800, color: "green.solid" },
            { name: "Canceled", value: 190, color: "red.solid" },
        ],
    })

    return (
        <GridItem colSpan={{ base: 1 }}>
            <ChartContainer title="Orders Status" >
                <Chart.Root height="16rem" chart={chart}>
                    <PieChart responsive >
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

export default OrdersStatusChart