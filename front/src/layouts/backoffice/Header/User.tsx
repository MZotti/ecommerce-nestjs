import { Menu, Portal } from "@chakra-ui/react"
import { GearIcon, IdentificationCardIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

const User = () => {
    return (
        <Menu.Root>
            <Menu.Trigger cursor="pointer">
                <UserIcon size={28} weight="duotone" />
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content w="160px">
                        <Menu.ItemGroup>
                            <Menu.Item value="my-account" asChild cursor="pointer">
                                <Link to="account">
                                    <IdentificationCardIcon size="16px" />
                                    My Account
                                </Link>
                            </Menu.Item>
                            <Menu.Item value="settings" asChild cursor="pointer">
                                <Link to="settings">
                                    <GearIcon size="16px" />
                                    Settings
                                </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.Separator />
                        <Menu.ItemGroup>
                            <Menu.Item value="exit" cursor="pointer">
                                <SignOutIcon size="16px" />
                                Exit
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default User