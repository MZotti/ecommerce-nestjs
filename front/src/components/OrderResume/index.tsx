import SimpleCard from '@/components/SimpleCard'
import { Button, Flex, Separator, Text, VStack } from '@chakra-ui/react'
import { calculateCartTotalPrice } from '@/functions/cart'
import { useSelector } from 'react-redux'
import type { State } from '@/state/reducers'
import { formatPriceToCurrency } from '@/functions/textFormat'
import OrderResumeDetail from './OrderResumeDetail'

const OrderResume = ({ actionButton }: { actionButton: React.ReactNode }) => {
    const cart = useSelector(({ cart }: State) => cart)

    return (
        <Flex flexGrow={1}>
            <SimpleCard title="Order Resume">
                <VStack w="full" gap={4}>
                    <OrderResumeDetail>
                        <Text>Items total price:</Text>
                        <Text>USD {formatPriceToCurrency(calculateCartTotalPrice(cart))}</Text>
                    </OrderResumeDetail>
                    <OrderResumeDetail>
                        <Text>Shipping:</Text>
                        <Text>USD {formatPriceToCurrency(0)}</Text>
                    </OrderResumeDetail>
                    <Separator w="full" variant="solid" />
                    <OrderResumeDetail>
                        <Text fontWeight="bold">Total:</Text>
                        <Text fontWeight="bold" color="green">USD {formatPriceToCurrency(calculateCartTotalPrice(cart))}</Text>
                    </OrderResumeDetail>
                    {
                        actionButton
                    }
                </VStack>
            </SimpleCard>
        </Flex>
    )
}

export default OrderResume