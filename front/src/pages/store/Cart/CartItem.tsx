import { formatPriceToCurrency } from '@/functions/textFormat'
import type { OrderItem } from '@/interfaces/order'
import { cartCreator } from '@/state'
import { Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { MinusIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const CartItem = ({ item }: { item: OrderItem }) => {
    const dispatch = useDispatch()
    const { increaseProductAction, decreaseProductAction, removeFromCartAction } = bindActionCreators(cartCreator, dispatch)

    const onDecrease = () => {
        decreaseProductAction({ productId: item.productId, quantity: 1 })
    }

    const onIncrease = () => {
        increaseProductAction({ productId: item.productId, quantity: 1 })
    }

    const onRemove = () => {
        removeFromCartAction(item.productId)
    }

    return (
        <Flex w="full" p={12} gap={8} alignItems="center" justifyContent="space-between">
            <HStack gap={4} w="full">
                <Image
                    src={item.productImageUrl}
                    width="100px"
                />
                <VStack alignItems="start" w="full">
                    <Text>{item.productName}</Text>
                    <Text fontSize="sm">USD {formatPriceToCurrency(item.price)}</Text>
                </VStack>
            </HStack>
            <HStack w="full" justifyContent="end" alignItems="center">
                <HStack>
                    {
                        item.quantity <= 1 ?
                            <Button colorPalette="red" onClick={onRemove} variant="plain" size="xs">
                                <TrashIcon weight="bold" />
                            </Button>
                            :
                            <Button onClick={onDecrease} variant="plain" size="xs">
                                <MinusIcon weight="bold" />
                            </Button>
                    }
                    <Text>{item.quantity}</Text>
                    <Button onClick={onIncrease} variant="plain" size="xs">
                        <PlusIcon />
                    </Button>
                </HStack>
                <Text fontWeight="bold">USD {formatPriceToCurrency(item.price * item.quantity)}</Text>
            </HStack>
        </Flex>
    )
}

export default CartItem