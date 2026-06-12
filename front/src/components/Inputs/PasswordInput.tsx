import { Input } from '@chakra-ui/react'
import InputContainer from './InputContainer'
import { useState } from 'react'
import { useFormContext } from "@/contexts/FormContext"
import { useFormContext as useHookFormContext } from 'react-hook-form'

interface Props {
    id: string
    label: string
    required?: boolean
}

const PasswordInput = (props: Props) => {
    const { id } = props
    const { isLoadingSubmit } = useFormContext();
    const { register } = useHookFormContext();
    const [hidden] = useState<boolean>(true);

    return (
        <InputContainer {...props}>
            <Input {...register(id)} type={hidden ? 'password' : 'text'} disabled={isLoadingSubmit} />
        </InputContainer>
    )
}

export default PasswordInput