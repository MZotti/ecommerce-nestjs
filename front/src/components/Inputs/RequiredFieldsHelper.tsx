import { HStack, Text } from "@chakra-ui/react"

const RequiredFieldsHelper = () => {
    return (
        <HStack mt={4}>
            <Text color="red" fontSize="xs" fontWeight="light">*</Text>
            <Text fontSize="xs" fontWeight="light">Required fields</Text>
        </HStack>
    )
}

export default RequiredFieldsHelper