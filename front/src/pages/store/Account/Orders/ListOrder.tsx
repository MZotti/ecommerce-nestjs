import { OrderStatusColor } from '@/enums/order'
import { dateFormat } from '@/functions/date'
import { formatPriceToCurrency } from '@/functions/textFormat'
import type TOrder from '@/interfaces/order'
import { Badge, Box, Flex, Float, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ListOrder = ({ order }: { order: TOrder }) => {
    const countItemsMinusOne = () => {
        let total = order.items.length;

        return total - 1;
    }

    return (
        <Box w="full" position="relative">
            <Link to={`./${order.id}`}>
                <Flex justifyContent="space-between">
                    <VStack alignItems="start" gap={4}>
                        <Text>Order #{order.id} - {dateFormat(order.createdAt, "dd/MM/yyyy HH:mm:ss")}</Text>
                        <Badge colorPalette={OrderStatusColor[order.status]} size="lg">{order.status}</Badge>
                        <Text fontWeight="bold">Total: USD {formatPriceToCurrency(order.total)}</Text>
                    </VStack>
                    <HStack>
                        <Box outline="1px solid" outlineColor="gray.200" borderRadius="sm" p={2}>
                            <Image src={order.items[0].productImageUrl} h="100px" />
                        </Box>
                        {
                            order.items.length > 1 &&
                            <Box outline="1px solid" outlineColor="gray.200" borderRadius="sm" p={2} position="relative">
                                <Image src={order.items[1].productImageUrl} h="100px" opacity={0.5} />
                                <Float placement="middle-center" w="full">
                                    <Text fontWeight="bold" fontSize="2xl">+ {countItemsMinusOne()}</Text>
                                </Float>
                            </Box>
                        }
                    </HStack>
                </Flex>
            </Link>
        </Box>
    )
}

export default ListOrder