import { Navigate, Outlet } from "react-router-dom"
import Header from "./Header"
import NavBar from "./NavBar"
import { Box, Flex } from "@chakra-ui/react"
import LoadingScreen from "./LoadingScreen"
import { useMe } from "@/hooks/auth"
import { Toaster } from "@/components/chakra-ui/toaster"
import { useColorModeValue } from "@/components/chakra-ui/color-mode"

const BackofficeLayout = () => {
    const backgroundColor = useColorModeValue("gray.200", "bg");
    const { data, error, isFetching } = useMe();

    if (isFetching)
        return <LoadingScreen />

    if(error)
        return <Navigate to="/backoffice/login" />

    return (
        <Box
            w="full"
            h="full"
            position="relative"
            backgroundColor={backgroundColor}
        >
            <Header />
            <NavBar />
            <Flex
                w="full"
                h="full"
                pt="100px"
                pl="280px"
                pr="40px"
                pb="40px"
            >
                <Outlet />
            </Flex>
            <Toaster />
        </Box>
    )
}

export default BackofficeLayout