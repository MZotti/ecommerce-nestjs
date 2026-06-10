import { Card, Grid, Text } from '@chakra-ui/react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormProvider as HookFormProvider } from 'react-hook-form'
import FormActions from './FormActions'
import { FormContext } from '@/contexts/FormContext'

interface Props<T extends FieldValues> {
    methods: UseFormReturn<T>
    columns?: number
    isLoading?: boolean
    isLoadingSubmit?: boolean
    noLayout?: boolean
    children: React.ReactNode | React.ReactNode[]
}

const FormContainer = <T extends FieldValues,>({ methods, columns = 1, isLoading = false, isLoadingSubmit = false, noLayout = false, children }: Props<T>) => {

    return (
        <HookFormProvider<T> {...methods}>
            <FormContext.Provider value={{
                isLoading,
                isLoadingSubmit
            }}>
                {
                    !noLayout ?
                        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
                            {children}
                        </Grid>
                        :
                        <>
                            {children}
                        </>
                }
            </FormContext.Provider>
        </HookFormProvider>
    )

    // return (
    //     <Card.Root m="auto" mt={0} size="lg" variant={cardLess ? "subtle" : "elevated"}>
    //         <FormContext.Provider value={{
    //             submitLabel,
    //             cancelLabel,
    //             onSubmit,
    //             onCancel,
    //             isLoading,
    //             isLoadingSubmit
    //         }}>
    //             <Card.Header>
    //                 <Text fontSize="md">{title}</Text>
    //             </Card.Header>
    //             <form onSubmit={handleSubmit(onSubmit)}>
    //                 <Card.Body >
    //                     <HookFormProvider<T> {...methods}>
    //                         <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
    //                             {children}
    //                         </Grid>
    //                     </HookFormProvider>
    //                 </Card.Body>
    //                 <Card.Footer>
    //                     <FormActions />
    //                 </Card.Footer>
    //             </form>
    //         </FormContext.Provider>
    //     </Card.Root>
    // )
}

export default FormContainer