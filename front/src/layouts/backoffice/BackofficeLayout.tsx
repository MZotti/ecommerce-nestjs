import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import NavBar from "./NavBar"
import { Box, Flex } from "@chakra-ui/react"
import LoadingScreen from "./LoadingScreen"
import { useMe } from "@/hooks/auth"
import { Toaster } from "@/components/chakra-ui/toaster"
import { useColorModeValue } from "@/components/chakra-ui/color-mode"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { authCreator } from "@/state/shared"

const BackofficeLayout = () => {
    const navigate = useNavigate();

    const backgroundColor = useColorModeValue("gray.200", "bg");
    const { data, error, isFetching, isFetched } = useMe();

    const dispatch = useDispatch()
    const { updateMeAction } = bindActionCreators(authCreator, dispatch)

    useEffect(() => {
        if (error) {
            navigate("/backoffice/login")
        } else {
            updateMeAction(data)
        }
    }, [data, error, isFetched])

    if (isFetching)
        return <LoadingScreen />

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