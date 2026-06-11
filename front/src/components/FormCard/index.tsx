import { Button, Card, HStack, Text } from '@chakra-ui/react'
import FormContainer from '../Form/FormContainer'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

interface Props<T extends FieldValues> {
    title: string
    methods: UseFormReturn<T>
    onSubmit: any
    columns?: number
    isLoading?: boolean
    isLoadingSubmit?: boolean
    onCancel: () => void
    children: React.ReactNode
}

const FormCard = <T extends FieldValues,>({ title, methods, onSubmit, columns = 1, isLoading = false, isLoadingSubmit = false, onCancel, children }: Props<T>) => {
    return (
        <Card.Root m="auto" mt={0} size="lg">
            <form onSubmit={onSubmit}>
                <Card.Header>
                    <Text fontSize="md">{title}</Text>
                </Card.Header>
                <Card.Body >
                    <FormContainer
                        methods={methods}
                        columns={columns}
                        isLoading={isLoading}
                        isLoadingSubmit={isLoadingSubmit}
                    >
                        {children}
                    </FormContainer>
                </Card.Body>
                <Card.Footer>
                    <HStack w="full" justifyContent="end">
                        <Button colorPalette="gray" onClick={onCancel} disabled={isLoadingSubmit} >Cancel</Button>
                        <Button type="submit" colorPalette="green" disabled={isLoadingSubmit} loading={isLoadingSubmit} >Create</Button>
                    </HStack>
                </Card.Footer>
            </form>
        </Card.Root >
    )
}

export default FormCard