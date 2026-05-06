import CardContainer from '@/components/CardContainer'
import { Chart, useChart } from "@chakra-ui/charts"
import { Legend, Pie, PieChart, Sector, Tooltip } from "recharts"

const MockupChart = () => {
    const chart = useChart({
        data: [
            { name: "Pix", value: 400, color: "green.solid" },
            { name: "Credit", value: 300, color: "purple.solid" },
            { name: "Debit", value: 300, color: "blue.solid" },
            { name: "Payment Order", value: 200, color: "cyan.solid" },
        ],
    })

    return (
        <CardContainer fullW fullH title="Payment method">
            <Chart.Root mx="auto" chart={chart}>
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
        </CardContainer>
    )
}

export default MockupChart