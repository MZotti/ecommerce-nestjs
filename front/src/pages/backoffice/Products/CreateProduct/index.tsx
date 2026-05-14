import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import ProductForm from "../ProcuctForm"
import type ProductFormData from "../ProcuctForm/ProductFormData"
import { useCreateProduct } from "@/hooks/backoffice/products"

const formInitialState: ProductFormData = {
    name: "",
    categoryId: 0,
    description: "",
    price: 0,
    stock: 1
}

const CreateProduct = () => {
    const navigate = useNavigate();

    const methods = useForm<ProductFormData>({
        defaultValues: formInitialState
    })

    const { mutateAsync: createProduct, isPending } = useCreateProduct();

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        data.price = Number(data.price);
        data.stock = Number(data.stock);

        await createProduct(data)

        setModalOpen(true);
    }

    const backToList = () => {
        navigate('../products')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <FormContainer
                title="Create Product"
                submitLabel="Create"
                methods={methods}
                isLoadingSubmit={isPending}
                onSubmit={onSubmit}
                onCancel={backToList}
            >
                <ProductForm />
            </FormContainer>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default CreateProduct