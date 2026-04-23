import { useTableContext } from "@/contexts/TableContext"
import { ActionBar, Button, CloseButton, Portal } from "@chakra-ui/react"
import { TrashIcon } from "@phosphor-icons/react"

const TableActions = () => {
    const { rowsSelected, clearRowsSelected } = useTableContext();
    const onClose = () => clearRowsSelected();

    return (
        <ActionBar.Root
            open={rowsSelected.length > 0}
            closeOnInteractOutside={false}
        >
            <Portal>
                <ActionBar.Positioner>
                    <ActionBar.Content>
                        <ActionBar.SelectionTrigger>
                            {rowsSelected.length} selected
                        </ActionBar.SelectionTrigger>
                        <ActionBar.Separator />
                        <Button variant="outline" size="sm" colorPalette="red">
                            <TrashIcon size="18px" />
                            Delete
                        </Button>
                        <ActionBar.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={onClose} />
                        </ActionBar.CloseTrigger>
                    </ActionBar.Content>
                </ActionBar.Positioner>
            </Portal>
        </ActionBar.Root >
    )
}

export default TableActions