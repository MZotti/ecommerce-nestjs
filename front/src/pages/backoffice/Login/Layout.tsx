import { Box, Flex } from '@chakra-ui/react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            w="full"
            h="full"
        >
            <Flex
                w="full"
                h="full"
                justifyContent="center"
                alignItems="center"
                my="auto"
            >
                {children}
            </Flex>
        </Box>
    )
}

export default Layout