import { Accordion } from "@chakra-ui/react"
import menu from "./Menus"
import NavItem from "./NavItem"

const NavMenu = () => {
    return (
        <Accordion.Root w="full" px={4}>
            {
                menu.map(m => <NavItem key={m.id} {...m} />)
            }
        </Accordion.Root>
    )
}

export default NavMenu