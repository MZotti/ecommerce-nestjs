import { useTableContext } from "@/contexts/TableContext"
import { IconButton, Menu, Portal } from "@chakra-ui/react"
import { ListIcon, PencilLineIcon, TrashIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import DeleteAction from "./DeleteAction"
import { useState } from "react"

const RowActions = ({ id }: { id: number }) => {
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
    const { canUpdate, deleteAction, customRowActions } = useTableContext()

    return (
        <Menu.Root>
            <Menu.Trigger>
                <IconButton zIndex={2} size="xs" variant="surface" colorPalette="blue" pointerEvents="auto">
                    <ListIcon size="16px" />
                </IconButton>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        {
                            canUpdate && <Menu.Item value="new-txt" cursor="pointer" asChild><Link to={`${id}/update`}><PencilLineIcon size="16px" /> Update</Link></Menu.Item>
                        }
                        {
                            customRowActions && customRowActions.map(action => <Menu.Item value={action.label}>{action.icon} {action.label}</Menu.Item>)
                        }
                        {
                            deleteAction !== undefined && <Menu.Item value="delete" color="red" cursor="pointer" onClick={() => setDeleteIsOpen(true)}><TrashIcon size="16px" /> Delete</Menu.Item>
                        }
                    </Menu.Content>
                </Menu.Positioner>
                <DeleteAction rowId={id} isOpen={deleteIsOpen} onClose={() => setDeleteIsOpen(false)} />
            </Portal>
        </Menu.Root>
    )
}

export default RowActions