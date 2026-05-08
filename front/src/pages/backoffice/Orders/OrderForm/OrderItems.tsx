import { Button, Text } from "@chakra-ui/react"
import FormItem from "./FormItem"
import { useFieldArray, useFormContext } from "react-hook-form"

const OrderItems = () => {
    const { control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    })

    const addItem = () => {
        append({
            productId: 0,
            quantity: 1
        })
    }

    const removeItem = (index: number) => {
        remove(index)
    }

    return (
        <>
            {
                fields.map((field, index) => <FormItem key={field.id} index={index} onRemove={removeItem} />)
            }
            <Button colorPalette="green" onClick={addItem} >Add Item</Button>
            <Text fontWeight="bold" >Total: USD$ 0</Text>
        </>
    )
}

export default OrderItems