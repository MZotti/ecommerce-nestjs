import ChartContainer from '@/components/ChartContainer'
import type { MonthOrders } from '@/interfaces/analytics'
import { Chart, useChart } from '@chakra-ui/charts'
import { GridItem } from '@chakra-ui/react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

const OrdersPerMonth = ({ data }: { data: MonthOrders[] }) => {
    const chart = useChart({
        data: data.map(val => {
            return {
                label: val.label,
                Orders: val.value
            }
        }),
        series: [{ name: "Orders", color: "teal.solid" }],
    })

    return (
        <GridItem colSpan={{ base: 4 }}>
            <ChartContainer title="Orders per month">
                <Chart.Root height="16rem" my="auto" chart={chart}>
                    <BarChart data={chart.data} responsive>
                        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                        <XAxis
                            axisLine={false}
                            tickLine={false}
                            dataKey={chart.key("label")}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={chart.formatNumber({
                                style: "decimal",
                                notation: "compact",
                            })}
                        />
                        <Tooltip
                            cursor={{ fill: chart.color("bg.muted") }}
                            animationDuration={0}
                            content={<Chart.Tooltip />}
                        />
                        {chart.series.map((item: any) => (
                            <Bar
                                key={item.name}
                                dataKey={chart.key(item.name)}
                                fill={chart.color(item.color)}
                            />
                        ))}
                    </BarChart>
                </Chart.Root>
            </ChartContainer>
        </GridItem>
    )
}

export default OrdersPerMonth