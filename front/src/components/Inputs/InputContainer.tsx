import { useFormContext } from "@/contexts/FormContext"
import { Field, Skeleton, Text } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { useFormContext as useHookFormContext } from "react-hook-form"

interface Props {
    id: string
    label: string
    required?: boolean
    helperText?: string
    children: ReactNode
}

const InputContainer = ({ id, label, required = false, helperText, children }: Props) => {
    const { formState: { errors } } = useHookFormContext()
    const { isLoading } = useFormContext();

    const hasError = errors[id] !== undefined;
    const errorMessage = hasError ? errors[id]?.message?.toString() : "";

    return (
        <Field.Root invalid={hasError} >
            <Field.Label mb={1}>
                {label}
                <Text color="red" hidden={!required}>*</Text>
            </Field.Label>
            <Skeleton asChild loading={isLoading}>
                {children}
            </Skeleton>
            <Field.HelperText>{helperText}</Field.HelperText>
            <Field.ErrorText>{errorMessage}</Field.ErrorText>
        </Field.Root>
    )
}

export default InputContainer