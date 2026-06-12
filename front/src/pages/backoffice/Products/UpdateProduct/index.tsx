import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import ProductForm from "../ProcuctForm"
import { useGetProduct, useUpdateProduct } from "@/hooks/backoffice/products"
import type ProductFormData from "../ProcuctForm/ProductFormData"
import FormCard from "@/components/FormCard"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../ProcuctForm/schema"

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const products = useSelector(({ products }: State) => products)
    const storedProduct = products.find(product => product.id == Number(id)) || null;
    const { data, isFetching } = useGetProduct(Number(id), storedProduct);

    const product = storedProduct || data;

    const methods = useForm<ProductFormData>({
        values: {
            name: product?.name,
            categoryId: product?.category.id,
            description: product?.description,
            price: Number(product?.price),
            stock: product?.stock,
            imageUrl: product?.imageUrl
        },
        defaultValues: product,
        resolver: yupResolver(schema)
    })

    const { handleSubmit } = methods

    const { mutateAsync: updateProduct, isPending } = useUpdateProduct();

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        data.price = Number(data.price);
        await updateProduct({ id: Number(id), formData: data })

        setModalOpen(true);
    }

    const backToList = () => {
        navigate('../products')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <FormCard
                title="Update Product"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={backToList}
                isLoading={isFetching}
                isLoadingSubmit={isPending}
                isUpdate
            >
                <ProductForm />
            </FormCard>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default UpdateProduct