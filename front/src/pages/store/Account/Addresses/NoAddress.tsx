import { Box, Button, Center, Text } from '@chakra-ui/react'

const NoAddress = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <Center>
            <Box>
                <Text mb={4} fontWeight="bold">No address found.</Text>
                <Button colorPalette="orange" onClick={onOpen}>Create Address</Button>
            </Box>
        </Center>
    )
}

export default NoAddress