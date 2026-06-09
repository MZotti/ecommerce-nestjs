import NumberInput from '@/components/Inputs/NumberInput'
import SelectInput from '@/components/Inputs/SelectInput'
import TextInput from '@/components/Inputs/TextInput'
import { useGetCategories } from '@/hooks/backoffice/categories'
import { Skeleton } from '@chakra-ui/react'

const ProductForm = () => {
    const { data: categories = [], isFetching } = useGetCategories();

    const categoriesOptions = categories.map((category: any) => ({
        value: category.id,
        label: category.name
    }))

    return (
        <>
            <TextInput id='name' label='Name' />
            <Skeleton loading={isFetching}>
                <SelectInput id='categoryId' label='Category' options={categoriesOptions} />
            </Skeleton>
            <TextInput id='description' label='Description' />
            <NumberInput id='price' label='Price' />
            <NumberInput id='stock' label='Stock' />
            <TextInput id='imageUrl' label='Image URL' />
        </>
    )
}

export default ProductForm