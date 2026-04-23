import { Badge, Box, Button, CloseButton, Dialog, Grid, Portal } from '@chakra-ui/react'
import { EraserIcon, FunnelIcon } from '@phosphor-icons/react'
import { useTableContext } from 'contexts/TableContext'

import { FormProvider, useForm } from 'react-hook-form'
import FilterInput from './FilterInput'
import { setupFilters } from 'functions/filters'
import { useState } from 'react'

const getFilterValues = (values = {}): number => {
    let count = 0;

    Object.keys(values).forEach(value => {
        if(values[value] != "")
            count++;
    })

    return count;
}

const Filters = () => {
    const [open, setOpen] = useState(false)

    const { filterFields, setFilters } = useTableContext()
    const register = useForm()

    const { getValues, resetField } = register

    const onFilter = () => {
        const filterString = setupFilters(getValues())

        setFilters(filterString)
        setOpen(false)
    }

    const onReset = () => {
        filterFields.forEach(field => resetField(field.name, { defaultValue: '' }))

        setFilters("")
    }

    return (
        <Box>
            <Dialog.Root size="lg" lazyMount open={open} onOpenChange={e => setOpen(e.open)}>
                <Dialog.Trigger asChild>
                    <Button size="sm" variant="subtle">
                        {
                            getFilterValues(getValues()) == 0 ?
                                <FunnelIcon />
                                :
                                <Badge variant="surface">{getFilterValues(getValues())}</Badge>
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
                                <FormProvider {...register}>
                                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                                        {filterFields.map(field => (
                                            <FilterInput key={field.name} field={field} />
                                        ))}
                                    </Grid>
                                </FormProvider>
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
