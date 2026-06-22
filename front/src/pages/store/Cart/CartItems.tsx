import SimpleCard from '@/components/SimpleCard'
import type { State } from '@/state/reducers'
import { Button, Flex, Float, Separator, Text, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { TrashIcon } from '@phosphor-icons/react'
import { bindActionCreators } from 'redux'
import { cartCreator } from '@/state'

const CartItems = () => {
    const cart = useSelector(({ cart }: State) => cart)
    const dispatch = useDispatch()
    const { clearCartAction } = bindActionCreators(cartCreator, dispatch)

    const clearCart = () => {
        clearCartAction()
    }

    return (
        <Flex flexGrow={2} position="relative">
            {
                cart.length > 0 &&
                <Float placement="top-end" offsetX="90px" offsetY="30px" zIndex={99}>
                    <Button variant="outline" colorPalette="red" size="sm" onClick={clearCart}><TrashIcon />Clear cart items</Button>
                </Float>
            }
            <SimpleCard title="Cart Items">
                <VStack w="full" separator={<Separator w="full" variant="solid" />} >
                    {
                        cart.length == 0 && <Flex w="full" p={12} justifyContent="center" ><Text fontSize="md" textAlign="center">Cart is empty.</Text></Flex>
                    }
                    {
                        cart.map(item => <CartItem key={item.productId} item={item} />)
                    }
                </VStack>
            </SimpleCard>
        </Flex>
    )
}

export default CartItems