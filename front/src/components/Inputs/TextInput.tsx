import { Input } from '@chakra-ui/react'
import InputContainer from './InputContainer'
import { useFormContext } from 'react-hook-form'

interface Props {
    id: string
    label: string
}

const TextInput = (props: Props) => {
    const { id } = props
    const { register } = useFormContext();

    return (
        <InputContainer {...props}>
            <Input {...register(id)} />
        </InputContainer>
    )
}

export default TextInput