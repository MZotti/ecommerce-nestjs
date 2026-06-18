import { Box, Button, Center, Text } from '@chakra-ui/react'

const NoCard = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <Center>
            <Box>
                <Text mb={4} fontWeight="bold">No card found.</Text>
                <Button colorPalette="orange" onClick={onOpen}>Create Card</Button>
            </Box>
        </Center>
    )
}

export default NoCard