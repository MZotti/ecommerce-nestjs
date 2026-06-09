import { Box, Flex, Text } from "@chakra-ui/react"
import Menu from "./Menu"
import { Outlet } from "react-router-dom"
import SimpleCard from "@/components/SimpleCard"

const Account = () => {
    return (
        <Box w="full" px="400px" gap={2}>
            <Text fontSize="lg" fontWeight="bold" mb={6}>My Account</Text>
            <Flex gap={2}>
                <Menu />
                <Flex flex={3}>
                    <SimpleCard>
                        <Outlet />
                    </SimpleCard>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Account