import { NumberInput as ChakraNumberInput } from "@chakra-ui/react"
import InputContainer from './InputContainer'
import { useFormContext } from 'react-hook-form'

interface Props {
    id: string
    label: string
    required?: boolean
    colSpan?: number
}

const NumberInput = (props: Props) => {
    const { id } = props
    const { register } = useFormContext();

    return (
        <InputContainer {...props}>
            <ChakraNumberInput.Root w="full">
                <ChakraNumberInput.Input defaultValue={1} {...register(id)} />
            </ChakraNumberInput.Root>
        </InputContainer>
    )
}

export default NumberInput