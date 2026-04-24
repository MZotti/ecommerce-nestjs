import { useTableContext } from "@/contexts/TableContext"
import { IconButton, Menu, Portal } from "@chakra-ui/react"
import { ListIcon, PencilLineIcon, TrashIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

const RowActions = ({ id }: { id: number }) => {
    const { canUpdate, canDelete, customRowActions } = useTableContext()

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
                            canDelete && <Menu.Item value="delete" color="red" cursor="pointer"><TrashIcon size="16px" /> Delete</Menu.Item>
                        }
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default RowActions