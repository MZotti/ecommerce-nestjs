import { Box, Button, Flex } from '@chakra-ui/react'
import CartItems from './CartItems'
import OrderResume from '@/components/OrderResume'
import { Link } from 'react-router-dom'

const Cart = () => {
    return (
        <Flex w="full" px="400px" gap={2}>
            <CartItems />
            <OrderResume actionButton={
                <Box w="full">
                    <Link to="/checkout">
                        <Button w="full" colorPalette="orange">Checkout</Button>
                    </Link>
                </Box>}
            />
        </Flex>
    )
}

export default Cart