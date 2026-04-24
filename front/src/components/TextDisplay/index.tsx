import { Text, VStack } from '@chakra-ui/react'

interface Props {
    label: string
    value: any
}

const TextDisplay = ({ label, value }: Props) => {
    return (
        <VStack w="full" gap={2}>
            <Text fontSize="md" fontWeight="bold" w="full">{label}</Text>
            <Text fontSize="md" w="full">{value}</Text>
        </VStack>
    )
}

export default TextDisplay