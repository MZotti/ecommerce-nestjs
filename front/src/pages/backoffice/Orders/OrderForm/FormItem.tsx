import AsyncSelectSearchInput from '@/components/Inputs/AsyncSelectSearchInput'
import NumberInput from '@/components/Inputs/NumberInput'
import { getProductsByName } from '@/services/backoffice/products'
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface Props {
    index: number
    onRemove: (args1: number) => void
}

const FormItem = ({ index, onRemove }: Props) => {
    const { getValues } = useFormContext();
    const onSearch = getProductsByName;

    const getSubTotal = () => {
        const itemPrice = 0
        const quantity = 0

        return itemPrice * quantity;
    }

    return (
        <Box>
            <HStack>
                <AsyncSelectSearchInput
                    id={`items.${index}.productId`}
                    label="Product"
                    onSearch={onSearch}
                    optionLabel="name"
                    optionSecondaryLabel="price"
                />
                <NumberInput id={`items.${index}.quantity`} label="Quantity" />
                <Button colorPalette="red" onClick={() => onRemove(index)}>X</Button>
            </HStack>
            <Text>Subtotal: USD$ {getSubTotal()}</Text>
        </Box>
    )
}

export default FormItem