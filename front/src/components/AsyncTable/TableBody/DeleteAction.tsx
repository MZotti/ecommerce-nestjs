import ActionModal from "@/components/ActionModal"
import { toaster } from "@/components/chakra-ui/toaster"
import { useTableContext } from "@/contexts/TableContext"
import type ModalAction from "@/interfaces/modalAction"
import { Alert, VStack } from "@chakra-ui/react"

interface Props {
    rowId: number
    isOpen: boolean,
    onClose: () => void
}

const DeleteAction = ({ rowId, isOpen, onClose }: Props) => {
    const { deleteAction } = useTableContext()
    const { mutateAsync: deleteModel, isPending } = deleteAction;

    const onDelete = async () => {
        await deleteModel(rowId);

        onClose();

        toaster.create({
            description: "Product deleted",
            type: "success",
        })
    }

    const actions: ModalAction[] = [
        {
            label: 'Cancel',
            callback: onClose
        },
        {
            label: 'Confirm',
            callback: () => onDelete(),
            color: 'red'
        },
    ]

    return (
        <ActionModal isOpen={isOpen} onClose={onClose} actions={actions} isLoading={isPending}>
            <Alert.Root status="warning">
                <VStack justifyContent="center" w="full">
                    <Alert.Indicator w="26px" h="26px" />
                    <Alert.Title fontSize="lg">Confirm the delete action</Alert.Title>
                </VStack>
            </Alert.Root>
        </ActionModal>
    )
}

export default DeleteAction