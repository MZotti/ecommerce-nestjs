import { Accordion, Flex, Text, VStack } from "@chakra-ui/react"
import type { MenuItem } from "./Menus"
import { useColorModeValue } from "@/components/chakra-ui/color-mode"
import { Link } from "react-router-dom"
import { hasRole } from "@/functions/auth"
import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"

interface Props {
    id: string
    label: string
    link?: string
    icon?: React.ReactNode
    subItems: MenuItem[]
}

const NavItem = ({ id, label, link, icon, subItems }: Props) => {
    const { user } = useSelector(({ shared }: State) => shared.auth)

    const backgroundHoverColor = useColorModeValue('gray.300', 'gray.600');
    const backgroundActiveColor = useColorModeValue('gray.300', 'gray.600');

    if (subItems.length == 0)
        return (
            <Flex asChild w="full" justifyContent="start" alignItems="center" h="50px" pl={4} _hover={{
                backgroundColor: backgroundHoverColor
            }}>
                <Link to={link!}>
                    {icon}
                    < Text fontSize="md" > {label}</Text >
                </Link>
            </Flex>
        )

    return (
        <Accordion.Item value={id} w="full" >
            <Accordion.ItemTrigger h="50px" p={0} cursor="pointer">
                {icon}
                < Text fontSize="md" > {label}</Text >
                <Accordion.ItemIndicator ml="auto" />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
                <Accordion.ItemBody p={0}>
                    <Flex w="full" justifyContent="start" alignItems="center">
                        <VStack w="full" gap={0}>
                            {
                                subItems?.filter(m => !m.roles ? m : hasRole(m.roles, user?.role.name || '')).map(m => <NavItem key={m.id} {...m} />)
                            }
                        </VStack>
                    </Flex >
                </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item >
    )
}

export default NavItem