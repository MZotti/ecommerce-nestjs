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
import { toaster } from "@/components/chakra-ui/toaster"

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const products = useSelector(({ backoffice }: State) => backoffice.products)
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

    const { mutate: updateProduct, isPending } = useUpdateProduct({
        onSuccess: () => setModalOpen(true),
        onError: (error) => toaster.create({
            description: error.response.data.message,
            type: "error",

        })
    });

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        data.price = Number(data.price);
        updateProduct({ id: Number(id), formData: data })
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