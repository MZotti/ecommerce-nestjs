import type ModalAction from '@/interfaces/modalAction'
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'

interface Props {
    isOpen: boolean
    onClose: () => void
    canClose?: boolean
    isLoading?: boolean
    actions: ModalAction[]
    children: React.ReactNode
}

const ActionModal = ({ isOpen, onClose, canClose = true, isLoading = false, actions, children }: Props) => {

    return (
        <Dialog.Root placement="center" open={isOpen} closeOnEscape={canClose} closeOnInteractOutside={canClose}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content pt={6}>
                        <Dialog.Body>
                            {children}
                        </Dialog.Body>
                        <Dialog.Footer>
                            {actions.map(action => <Button key={action.label} variant="subtle" colorPalette={action.color} onClick={action.callback} disabled={isLoading} >{action.label}</Button>)}
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild hidden={!canClose}>
                            <CloseButton size="sm" onClick={onClose} disabled={isLoading} />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ActionModal