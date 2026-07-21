import { useFetchDataContext } from "@/contexts/FetchDataContext";
import { Box, Button, Menu, Portal, useDisclosure } from "@chakra-ui/react";
import { ListBulletsIcon } from "@phosphor-icons/react";
import ShipOrder from "./ShipOrder";
import type Order from "@/interfaces/order";
import { OrderStatus } from "@/enums/order";

const OrderActions = () => {
    const { data: order } = useFetchDataContext<Order>();
    const { open: shipOpen, onOpen: onShipOpen, onClose: onShipClose } = useDisclosure();

    return (
        <Box position="absolute" right={0}>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm"><ListBulletsIcon size={18} /></Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.ItemGroup >
                                <Menu.Item hidden={order?.status !== OrderStatus.PAID} cursor="pointer" value="ship" onClick={onShipOpen} >Ship Order</Menu.Item>
                                <Menu.Item hidden={order?.status === OrderStatus.FINISHED} cursor="pointer" value="cancel" color="red" >Cancel Order</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
            <ShipOrder isOpen={shipOpen} onClose={onShipClose} />
        </Box>
    )
}

export default OrderActions