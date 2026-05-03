import { Alert, Button, Dialog, Portal, VStack } from "@chakra-ui/react"

interface Props {
    isOpen: boolean
    label: string
    actions: any[]
}

const SuccessModal = ({ isOpen, label, actions }: Props) => {
    return (
        <Dialog.Root size="md" placement="center" open={isOpen}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body>
                            <Alert.Root status="success" title={label}>
                                <VStack justifyContent="center" w="full">
                                    <Alert.Indicator w="26px" h="26px" />
                                    <Alert.Title fontSize="lg">{label}</Alert.Title>
                                </VStack>
                            </Alert.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            {
                                actions.map(action => <Button key={action.label} variant="subtle" onClick={action.onClick}>{action.label}</Button>)
                            }
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default SuccessModal