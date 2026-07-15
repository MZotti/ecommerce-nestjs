import ChartContainer from '@/components/ChartContainer'
import type { LabelAndValue } from '@/interfaces/analytics'
import { Chart, useChart } from "@chakra-ui/charts"
import { GridItem } from '@chakra-ui/react'
import { Legend, Pie, PieChart, Sector, Tooltip } from "recharts"

const OrdersStatusChart = ({ data }: { data: LabelAndValue[]}) => {
    const chart = useChart({
        data: [
            { name: "Pending", value: data.find(val => val.label == 'PENDING')?.value || 0, color: "orange.solid" },
            { name: "Paid", value: data.find(val => val.label == 'PAID')?.value || 0, color: "yellow.solid" },
            { name: "Shipped", value: data.find(val => val.label == 'SHIPPED')?.value || 0, color: "blue.solid" },
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