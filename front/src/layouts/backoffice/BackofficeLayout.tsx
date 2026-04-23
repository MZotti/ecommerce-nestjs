import { Outlet } from "react-router-dom"
import Header from "./Header"
import NavBar from "./NavBar"
import { Box, Flex } from "@chakra-ui/react"

const BackofficeLayout = () => {
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
        </Box>
    )
}

export default BackofficeLayout