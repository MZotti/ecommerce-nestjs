import { Input, InputGroup } from '@chakra-ui/react'
import InputContainer from './InputContainer'
import { useFormContext } from "@/contexts/FormContext"
import { useFormContext as useHookFormContext } from 'react-hook-form'

interface Props {
    id: string
    label: string
    required?: boolean
    colSpan?: number
}

const CurrencyInput = (props: Props) => {
    const { id } = props
    const { isLoadingSubmit } = useFormContext();
    const { register } = useHookFormContext();

    return (
        <InputContainer {...props}>
            <InputGroup
                startElement="$"
                startElementProps={{ color: "fg.muted" }}
            >
                <Input {...register(id)} disabled={isLoadingSubmit} />
            </InputGroup>
        </InputContainer>
    )
}

export default CurrencyInput