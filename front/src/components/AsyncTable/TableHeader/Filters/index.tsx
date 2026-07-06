import { Badge, Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { EraserIcon, FunnelIcon } from '@phosphor-icons/react'
import { useTableContext } from 'contexts/TableContext'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormContainer from '@/components/Form/FormContainer'

const Filters = () => {
    const [open, setOpen] = useState(false)

    const { filterFields, setFilters } = useTableContext()
    const methods = useForm();
    const { getValues, reset, resetField } = methods

    const onFilter = () => {
        const values = getValues();
        const params = new URLSearchParams();

        Object.keys(values).map(val => values[val] && values[val] !== '' && params.append(val, values[val].toString()))

        setFilters(params.toString())

        setOpen(false)
    }

    const onReset = () => {
        const values = getValues();
        Object.keys(values).forEach(val => resetField(val, { defaultValue: '' }))
        reset();
        setFilters("")
    }

    const countParams = () => {
        const values = getValues();
        const count = Object.keys(values).filter(val => values[val]).length

        return count;
    }

    return (
        <Box>
            <Dialog.Root size="lg" lazyMount open={open} onOpenChange={e => setOpen(e.open)}>
                <Dialog.Trigger asChild>
                    <Button size="sm" variant="subtle">
                        {
                            countParams() == 0 ?
                                <FunnelIcon />
                                :
                                <Badge variant="surface">{countParams()}</Badge>
                        }
                        Filters
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Filters</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <FormContainer
                                    methods={methods}
                                    columns={4}
                                >
                                    {filterFields.map(field => field)}
                                </FormContainer>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button size="xs" variant="ghost">
                                        Close
                                    </Button>
                                </Dialog.ActionTrigger>
                                <Button size="xs" colorPalette="blue" onClick={onReset}>
                                    <EraserIcon /> Clear
                                </Button>
                                <Button size="xs" colorPalette="green" onClick={onFilter}>
                                    <FunnelIcon /> Apply
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Box>
    )
}

export default Filters
