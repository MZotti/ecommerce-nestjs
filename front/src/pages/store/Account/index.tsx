import { Box, Flex, Text } from "@chakra-ui/react"
import Menu from "./Menu"
import { Navigate, Outlet } from "react-router-dom"
import SimpleCard from "@/components/SimpleCard"
import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import { isStoreUser } from "@/functions/auth"

const Account = () => {
    const auth = useSelector(({ shared }: State) => shared.auth)

    if (!isStoreUser(auth.user)) {
        return <Navigate to="/" replace />;
    }

    return (
        <Box w="full" px="400px" gap={2}>
            <Text fontSize="lg" fontWeight="bold" mb={6}>My Account</Text>
            <Flex gap={2}>
                <Menu />
                <Flex flex={4}>
                    <SimpleCard>
                        <Outlet />
                    </SimpleCard>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Account