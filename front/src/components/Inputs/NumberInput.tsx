import { NumberInput as ChakraNumberInput } from "@chakra-ui/react"
import InputContainer from './InputContainer'
import { useFormContext } from 'react-hook-form'

interface Props {
    id: string
    label: string
}

const NumberInput = (props: Props) => {
    const { id } = props
    const { register } = useFormContext();

    return (
        <InputContainer {...props}>
            <ChakraNumberInput.Root w="full">
                <ChakraNumberInput.Input {...register(id)} />
            </ChakraNumberInput.Root>
        </InputContainer>
    )
}

export default NumberInput