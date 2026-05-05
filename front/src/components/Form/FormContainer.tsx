import { Card, Grid, Text } from '@chakra-ui/react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormProvider as HookFormProvider } from 'react-hook-form'
import FormActions from './FormActions'
import { FormContext } from '@/contexts/FormContext'

interface Props<T extends FieldValues> {
    title: string
    methods: UseFormReturn<T>
    columns?: number
    submitLabel: string
    cancelLabel?: string
    onSubmit: (args1: any) => void
    onCancel?: () => void
    isLoading?: boolean
    isLoadingSubmit: boolean
    cardLess?: boolean
    children: React.ReactNode | React.ReactNode[]
}

const FormContainer = <T extends FieldValues,>({ title, methods, columns = 1, submitLabel, cancelLabel = "Cancel", onSubmit, onCancel, isLoading = false, isLoadingSubmit, cardLess = false, children }: Props<T>) => {
    const { handleSubmit } = methods

    return (
        <Card.Root m="auto" mt={0} size="lg">
            <FormContext.Provider value={{
                submitLabel,
                cancelLabel,
                onSubmit,
                onCancel,
                isLoading,
                isLoadingSubmit
            }}>
                <Card.Header>
                    <Text fontSize="md">{title}</Text>
                </Card.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Body >
                        <HookFormProvider<T> {...methods}>
                            <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
                                {children}
                            </Grid>
                        </HookFormProvider>
                    </Card.Body>
                    <Card.Footer>
                        <FormActions />
                    </Card.Footer>
                </form>
            </FormContext.Provider>
        </Card.Root>
    )
}

export default FormContainer