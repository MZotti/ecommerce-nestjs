import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { UserCircleIcon } from "@phosphor-icons/react"
import CustomerLogin from "../CustomerLogin"
import { useState } from "react"
import { CustomerLoginContext } from "@/contexts/CustomerLoginContext"
import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import { Link } from "react-router-dom"

export interface LoginContextProps {
    isOpen: boolean
    display: string
}

const Account = () => {
    const { user } = useSelector(({ auth }: State) => auth)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [display, setDisplay] = useState<"login" | "register">("login");

    const onAccountClick = () => {
        if (user !== undefined) {

        } else {
            openModalLogin();
        }
    }

    const openModalLogin = () => {
        setDisplay("login");
        setModalIsOpen(true);
    }

    const openModalRegister = () => {
        setDisplay("register");
        setModalIsOpen(true);
    }

    return (
        <Box>
            <HStack>
                <Box cursor="pointer" onClick={onAccountClick}>
                    <UserCircleIcon color="#FFF" size={28} />
                </Box>
                {
                    user !== undefined ?
                        <Link to="/my-account">
                            <Text fontSize="sm" fontWeight="bold" color="#FFF">{user?.name}</Text>
                        </Link>
                        :
                        <Flex gap={1} color="#FFF">
                            <Text fontWeight="bold" cursor="pointer" onClick={openModalLogin}>Login</Text>
                            or
                            <Text fontWeight="bold" cursor="pointer" onClick={openModalRegister}>create account</Text>
                        </Flex>
                }
            </HStack>
            <CustomerLoginContext.Provider value={{
                display: display,
                isOpen: modalIsOpen,
                setIsOpen: setModalIsOpen,
                setDisplay: setDisplay
            }}>
                <CustomerLogin />
            </CustomerLoginContext.Provider>
        </Box>
    )
}

export default Account