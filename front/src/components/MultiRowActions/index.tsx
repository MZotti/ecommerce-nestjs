import { ActionBar, Portal } from "@chakra-ui/react"

const MultiRowActions = () => {
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

export default MultiRowActions