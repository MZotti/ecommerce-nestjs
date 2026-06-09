import { LightMode } from '@/components/chakra-ui/color-mode'
import { Menu, Portal, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const categoriesOptions = [
    {
        label: "Mother Boards",
        link: "mother-board"
    },
    {
        label: "Graphic Cards",
        link: "graphic-card"
    },
    {
        label: "CPUs",
        link: "cpu"
    },
    {
        label: "RAMs",
        link: "ram"
    },
    {
        label: "Storages",
        link: "storage"
    },
    {
        label: "Power Supplies",
        link: "power-supply"
    },
    {
        label: "CPU Coolers",
        link: "cpu-cooler"
    },
    {
        label: "Cases",
        link: "case"
    },
    {
        label: "Case Fans",
        link: "case-fan"
    },
]

const Categories = () => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text fontWeight="bold" color="white" cursor="pointer">Categories</Text>
            </Menu.Trigger>
            <Portal>
                <LightMode>
                    <Menu.Positioner>
                        <Menu.Content>
                            {
                                categoriesOptions.map(cat => <Menu.Item value="rename"><Link to={cat.link}>{cat.label}</Link></Menu.Item>)
                            }
                        </Menu.Content>
                    </Menu.Positioner>
                </LightMode>
            </Portal>
        </Menu.Root>
    )
}

export default Categories