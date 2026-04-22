import { Field } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface Props {
    id: string
    label: string
    children: ReactNode
}

const InputContainer = ({ label, children }: Props) => {
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