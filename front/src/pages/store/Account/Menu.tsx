import SimpleCard from '@/components/SimpleCard'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <Flex flex={1}>
            <SimpleCard>
                <VStack>
                    <Link to="./">
                        <Text>Details</Text>
                    </Link>
                    <Link to="./orders">
                        <Text>Orders</Text>
                    </Link>
                    <Link to="./addresses">
                        <Text>Addressses</Text>
                    </Link>
                    <Link to="./cards">
                        <Text>Cards</Text>
                    </Link>
                </VStack>
            </SimpleCard>
        </Flex>
    )
}

export default Menu