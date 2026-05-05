import { Navigate, Outlet } from "react-router-dom"
import Header from "./Header"
import NavBar from "./NavBar"
import { Box, Flex } from "@chakra-ui/react"
import LoadingScreen from "./LoadingScreen"
import { useMe } from "@/hooks/auth"
import { Toaster } from "@/components/chakra-ui/toaster"

const BackofficeLayout = () => {
    const { data, error, isFetching } = useMe();
    console.log(data, error);

    if (isFetching)
        return <LoadingScreen />

    if(error)
        return <Navigate to="/backoffice/login" />

    return (
        <Box
            w="full"
            h="full"
            position="relative"
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