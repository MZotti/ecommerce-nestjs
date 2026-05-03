import { useFormContext } from "@/contexts/FormContext"
import { Field, Skeleton } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface Props {
    id: string
    label: string
    children: ReactNode
}

const InputContainer = ({ label, children }: Props) => {
    const { isLoading } = useFormContext();

    return (
        <Field.Root>
            <Field.Label mb={1}>
                {label}
                <Field.RequiredIndicator />
            </Field.Label>
            <Skeleton asChild loading={isLoading}>
                {children}
            </Skeleton>
            <Field.HelperText />
            <Field.ErrorText />
        </Field.Root>
    )
}

export default InputContainer