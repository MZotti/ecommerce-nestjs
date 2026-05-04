import { OrderStatusColor, type OrderStatus } from "@/enums/order"
import { Flex, Status, Text, type ConditionalValue } from "@chakra-ui/react"

interface Props {
    status: OrderStatus
    size?: ConditionalValue<"sm" | "md" | "lg" | undefined>
}

const OrderStatusDisplay = ({ status, size = "md" }: Props) => {
    return (
        <Flex justifyContent="start" alignItems="center" gap={2}>
            <Status.Root colorPalette={OrderStatusColor[status]} size={size}>
                <Status.Indicator />
                <Text fontSize="md">{status}</Text>
            </Status.Root>
        </Flex>
    )
}

export default OrderStatusDisplay