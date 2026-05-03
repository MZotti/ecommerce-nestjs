
import { Alert, Button, Dialog, Portal, VStack } from "@chakra-ui/react"

interface Props {
    isOpen: boolean
    onConfirm: (args1: number) => void
    onClose: () => void
    isLoading: boolean
    model: string
}

const DeleteModal = ({ isOpen, onConfirm, onClose, isLoading, model }: Props) => {
    return (
        <Dialog.Root placement="center" open={isOpen}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body>
                            <Alert.Root status="warning">
                                <VStack justifyContent="center" w="full">
                                    <Alert.Indicator w="26px" h="26px" />
                                    <Alert.Title fontSize="lg">Confirm the action</Alert.Title>
                                </VStack>
                            </Alert.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant="subtle" disabled={isLoading} onClick={onClose}>Cancel</Button>
                            <Button variant="subtle" disabled={isLoading} onClick={onConfirm} colorPalette="red">Confirm</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default DeleteModal