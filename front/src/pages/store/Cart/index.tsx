import { Box, Button, Flex, Text } from '@chakra-ui/react'
import CartItems from './CartItems'
import OrderResume from '@/components/OrderResume'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { State } from '@/state/reducers'

const Cart = () => {
    const cart = useSelector(({ cart }: State) => cart)
    return (
        <Flex w="full" px="400px" gap={2}>
            <CartItems />
            <OrderResume actionButton={
                <Box w="full" justifyContent="center">
                    {
                        cart.length === 0 ? <Text fontWeight="bold">Add items to your cart to checkout</Text>
                            :
                            <Link to="/checkout">
                                <Button w="full" colorPalette="orange">Checkout</Button>
                            </Link>
                    }
                </Box>}
            />
        </Flex>
    )
}

export default Cart