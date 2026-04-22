import { Input } from '@chakra-ui/react'
import InputContainer from './InputContainer'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
    id: string
    label: string
}

const PasswordInput = (props: Props) => {
    const { id } = props
    const { register } = useFormContext();
    const [hidden] = useState<boolean>(true);

    return (
        <InputContainer {...props}>
            <Input {...register(id)} type={hidden ? 'password' : 'text'} />
        </InputContainer>
    )
}

export default PasswordInput