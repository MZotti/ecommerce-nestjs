import NumberInput from '@/components/Inputs/NumberInput'
import SelectInput from '@/components/Inputs/SelectInput'
import TextInput from '@/components/Inputs/TextInput'

const ProductForm = () => {
    return (
        <>
            <TextInput id='name' label='Name' />
            <SelectInput id='categoryId' label='Category' options={[
                { value: 1, label: 'Graphic Card' },
                { value: 2, label: 'CPU' },
            ]} />
            <TextInput id='description' label='Description' />
            <NumberInput id='price' label='Price' />
            <NumberInput id='stock' label='Stock' />
        </>
    )
}

export default ProductForm