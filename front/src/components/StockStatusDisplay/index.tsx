import { getStockColor } from '@/functions/product'
import { Flex, Status, Text, type ConditionalValue } from '@chakra-ui/react'

interface Props {
    stock: number
    size?: ConditionalValue<"sm" | "md" | "lg" | undefined>
}

const StockStatusDisplay = ({ stock, size = "md" }: Props) => {
    return (
        <Flex justifyContent="start" alignItems="center" gap={2}>
            <Status.Root colorPalette={getStockColor(stock)} size={size}>
                <Status.Indicator />
                <Text fontSize="md">{stock === 0 ? "No stock" : stock}</Text>
            </Status.Root>
        </Flex>
    )
}

export default StockStatusDisplay