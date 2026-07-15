import ChartContainer from '@/components/ChartContainer'
import type { LabelAndValue } from '@/interfaces/analytics'
import { Chart, useChart } from "@chakra-ui/charts"
import { GridItem } from '@chakra-ui/react'
import { Legend, Pie, PieChart, Sector, Tooltip } from "recharts"

const PaymentMethodChart = ({ data }: { data: LabelAndValue[]}) => {
    const chart = useChart({
        data: [
            { name: "Pix", value: data.find(val => val.label == 'PIX')?.value || 0, color: "green.solid" },
            { name: "Credit", value: data.find(val => val.label == 'CREDIT')?.value || 0, color: "purple.solid" },
            { name: "Debit", value: data.find(val => val.label == 'DEBIT')?.value || 0, color: "blue.solid" },
            { name: "Payment Order", value: data.find(val => val.label == 'PAYMENT_ORDER')?.value || 0, color: "cyan.solid" },
        ],
    })

    return (
        <GridItem colSpan={{ base: 1 }}>
            <ChartContainer title="Payment methods" >
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

export default PaymentMethodChart