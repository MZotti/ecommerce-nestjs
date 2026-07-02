import { Accordion } from "@chakra-ui/react"
import menu from "./Menus"
import NavItem from "./NavItem"
import { hasRole } from "@/functions/auth"
import type { State } from "@/state/reducers"
import { useSelector } from "react-redux"

const NavMenu = () => {
    const { user } = useSelector(({ shared }: State) => shared.auth)

    return (
        <Accordion.Root w="full" px={4} variant="plain">
            {
                menu.filter(m => !m.roles ? m : hasRole(m.roles, user?.role.name || '')).map(m => <NavItem key={m.id} {...m} />)
            }
        </Accordion.Root>
    )
}

export default NavMenu