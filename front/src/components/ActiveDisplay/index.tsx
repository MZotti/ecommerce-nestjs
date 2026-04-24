import { Circle, Flex, Text } from '@chakra-ui/react'

const ActiveDisplay = ({ isActive, size = "sm" }: { isActive: boolean, size?: string }) => {
    return (
        <Flex justifyContent="start" alignItems="center" gap={2}>
            <Circle size="4" bg={isActive ? 'green' : 'red'} />
            <Text fontSize={size}>{isActive ? 'Active' : 'Unactive'}</Text>
        </Flex>
    )
}

export default ActiveDisplay