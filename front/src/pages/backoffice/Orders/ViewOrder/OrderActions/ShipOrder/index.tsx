import { toaster } from '@/components/chakra-ui/toaster';
import { useFetchDataContext } from '@/contexts/FetchDataContext';
import { useShipOrder } from '@/hooks/backoffice/orders';
import type Order from '@/interfaces/order';
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'

const ShipOrder = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { data: order } = useFetchDataContext<Order>();
    const { mutate: ship, isPending } = useShipOrder({
        onSuccess: () => {
            toaster.create({
                description: "Order shipped.",
                type: "success"
            })
            onClose();
        },
        onError: () => {
            toaster.create({
                description: "Unable to ship order.",
                type: "error"
            })
        }
    })

    const onShip = () => ship(order?.id)

    return (
        <Dialog.Root placement="center" open={isOpen}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Confirm Order Shipment
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            Please confirm the shipment for order #{order?.id}.
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant="ghost" onClick={onClose} disabled={isPending}>Cancel</Button>
                            <Button colorPalette="green" onClick={onShip} loading={isPending} disabled={isPending}>Ship Order</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={onClose} disabled={isPending} />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ShipOrder