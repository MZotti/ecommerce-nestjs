import { Flex, Status, Text, type ConditionalValue } from '@chakra-ui/react'

const ActiveDisplay = ({ isActive, size = "md" }: { isActive: boolean, size?: ConditionalValue<"sm" | "md" | "lg" | undefined> }) => {
    return (
        <Flex justifyContent="start" alignItems="center" gap={2}>
            <Status.Root colorPalette={isActive ? 'green' : 'red'} size={size}>
                <Status.Indicator />
                <Text fontSize="md">{isActive ? 'Active' : 'Inactive'}</Text>
            </Status.Root>
        </Flex>
    )
}

export default ActiveDisplay