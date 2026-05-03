import { useFormContext } from '@/contexts/FormContext'
import { Button, HStack } from '@chakra-ui/react'

const FormActions = () => {
    const { submitLabel, cancelLabel, onCancel, isLoadingSubmit } = useFormContext();

    return (
        <HStack justifyContent="end" w="full">
            {onCancel && <Button onClick={onCancel} disabled={isLoadingSubmit}>{cancelLabel}</Button>}
            <Button colorPalette="green" type="submit" disabled={isLoadingSubmit}>{submitLabel}</Button>
        </HStack>
    )
}

export default FormActions