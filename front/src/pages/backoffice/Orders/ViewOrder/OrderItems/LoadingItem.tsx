import { Flex, Skeleton, Text, VStack } from "@chakra-ui/react"

const LoadingItem = () => {
	return (
		<Flex w="full">
			<VStack gap={4} w="full" alignItems="start">
				<Skeleton w="300px" h="32px" />
				<Skeleton w="140px" h="32px" />
			</VStack>
		</Flex>
	)
}

export default LoadingItem