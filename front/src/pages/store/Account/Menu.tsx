import { Flex, VStack } from '@chakra-ui/react'
import MenuItem from './MenuItem'
import { useEffect, useState } from 'react'
import { IdentificationCardIcon, MapPinLineIcon, ShoppingBagOpenIcon } from '@phosphor-icons/react'

const menuItems = [
    {
        label: "Details",
        link: "./details",
        icon: (color: string) => <IdentificationCardIcon color={color} size={24} />
    },
    {
        label: "Orders",
        link: "./orders",
        icon: (color: string) => <ShoppingBagOpenIcon color={color} size={22} />
    },
    {
        label: "Addresses",
        link: "./addresses",
        icon: (color: string) => <MapPinLineIcon color={color} size={22} />
    },
    {
        label: "Cards",
        link: "./cards",
        icon: (color: string) => <IdentificationCardIcon color={color} size={22} />
    },
]

const Menu = () => {
    const [activeMenu, setActiveMenu] = useState<string>("./details");

    const onMenuClick = (link: string) => setActiveMenu(link);

    const isLinkActive = (link: string) => {
        const isActive = window.location.href.includes(`/my-account/${link.replace("./", "")}`)

        if (isActive)
            setActiveMenu(link)
    }

    useEffect(() => {
        menuItems.map(item => isLinkActive(item.link))
    }, [])

    return (
        <Flex flex={1} w="full">
            <VStack w="full">
                {
                    menuItems.map(item => <MenuItem key={item.link} {...item} isActive={activeMenu === item.link} onClick={onMenuClick} />)
                }
            </VStack>
        </Flex>
    )
}

export default Menu