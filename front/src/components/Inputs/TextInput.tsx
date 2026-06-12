import { Input } from '@chakra-ui/react'
import InputContainer from './InputContainer'
import { useFormContext } from "@/contexts/FormContext"
import { useFormContext as useHookFormContext } from 'react-hook-form'

interface Props {
    id: string
    label: string
    required?: boolean
}

const TextInput = (props: Props) => {
    const { id } = props
    const { isLoadingSubmit } = useFormContext();
    const { register } = useHookFormContext();

    return (
        <InputContainer {...props}>
            <Input {...register(id)} disabled={isLoadingSubmit} />
        </InputContainer>
    )
}

export default TextInput