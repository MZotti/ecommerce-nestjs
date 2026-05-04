import { Flex, Status, Text, type ConditionalValue } from '@chakra-ui/react'

interface Props {
    isActive: boolean
    size?: ConditionalValue<"sm" | "md" | "lg" | undefined>
}

const ActiveDisplay = ({ isActive, size = "md" }: Props) => {
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