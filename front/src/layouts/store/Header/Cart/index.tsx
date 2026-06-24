import type { State } from '@/state/reducers'
import { Box, Circle, Float, Text } from '@chakra-ui/react'
import { ShoppingCartIcon } from '@phosphor-icons/react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
    const cart = useSelector(({ store }: State) => store.cart)

    return (
        <Box cursor="pointer" position="relative" asChild>
            <Link to="/cart">
                <Float placement="top-end">
                    {
                        cart.length > 0 &&
                        <Circle size="5" bg="green.600" color="white">
                            <Text fontSize="sm">{cart.length}</Text>
                        </Circle>
                    }
                </Float>
                <ShoppingCartIcon color="#FFF" size={28} />
            </Link>
        </Box>
    )
}

export default Cart