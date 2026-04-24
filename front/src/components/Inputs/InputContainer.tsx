import { useFormContext } from "@/contexts/FormContext"
import { Field, Skeleton } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface Props {
    id: string
    label: string
    isLoading?: boolean
    children: ReactNode
}

const InputContainer = ({ label, children, isLoading = false }: Props) => {
    return (
        <Field.Root>
            <Field.Label mb={1}>
                {label}
                <Field.RequiredIndicator />
            </Field.Label>
            {children}
            <Field.HelperText />
            <Field.ErrorText />
        </Field.Root>
    )
}

export default InputContainer