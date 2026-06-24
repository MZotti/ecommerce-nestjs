import { Center, Progress, Text, VStack } from "@chakra-ui/react"

const LoadingBar = ({ label }: { label: string }) => {
    return (
        <Center w="full" h="full">
            <VStack>
                <Text fontSize="md">Loading {label}</Text>
                <Progress.Root variant="subtle" colorPalette="orange" w="400px" value={null}>
                    <Progress.Track h="6px">
                        <Progress.Range />
                    </Progress.Track>
                </Progress.Root>
            </VStack>
        </Center>
    )
}

export default LoadingBar