import { Box, Circle, Flex, Float, Menu, Portal, Text } from "@chakra-ui/react"
import { BellIcon } from "@phosphor-icons/react"

const Notifications = () => {
    return (
        <Menu.Root>
            <Menu.Trigger cursor="pointer">
                <Box w="28px" h="28px" position="relative">
                    <BellIcon size={28} weight="duotone" />
                    <Float>
                        <Circle size="4" bg="red" color="white">
                            <Text fontSize="xs">1</Text>
                        </Circle>
                    </Float>
                </Box>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content w="300px">
                        <Menu.ItemGroup>
                            <Flex w="full" justifyContent="center" my="20px">
                                <Text>No new notifications.</Text>
                            </Flex>
                        </Menu.ItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default Notifications