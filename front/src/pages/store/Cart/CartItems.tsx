import SimpleCard from '@/components/SimpleCard'
import type { State } from '@/state/reducers'
import { Flex, Separator, Text, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const CartItems = () => {
    const cart = useSelector(({ cart }: State) => cart)

    return (
        <Flex flexGrow={2}>
            <SimpleCard title="Cart Items">
                <VStack w="full" separator={<Separator w="full" variant="solid" />}>
                    {
                        cart.length == 0 && <Flex w="full" p={12} ><Text fontSize="md" textAlign="center">Cart is empty.</Text></Flex>
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