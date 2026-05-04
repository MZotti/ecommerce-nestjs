import { useFetchDataContext } from "@/contexts/FetchDataContext";
import { Box, Button, Menu, Portal } from "@chakra-ui/react";
import { ListBulletsIcon } from "@phosphor-icons/react";

const OrderActions = () => {
    const { data: order } = useFetchDataContext();

    return (
        <Box position="absolute" right={0}>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm"><ListBulletsIcon size={18} /></Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.ItemGroup>
                                <Menu.Item value="cancel" color="red" >Cancel Order</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Box>
    )
}

export default OrderActions