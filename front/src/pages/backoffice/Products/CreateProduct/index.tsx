import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import ProductForm from "../ProcuctForm"
import type ProductFormData from "../ProcuctForm/ProductFormData"
import { useCreateProduct } from "@/hooks/backoffice/products"
import FormCard from "@/components/FormCard"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../ProcuctForm/schema"
import { toaster } from "@/components/chakra-ui/toaster"

const formInitialState: ProductFormData = {
    name: "",
    categoryId: 0,
    description: "",
    price: 1,
    stock: 1,
}

const CreateProduct = () => {
    const navigate = useNavigate();

    const methods = useForm<ProductFormData>({
        defaultValues: formInitialState,
        resolver: yupResolver(schema)
    })

    const { handleSubmit } = methods;

    const { mutate: createProduct, isPending } = useCreateProduct({
        onSuccess: () => setModalOpen(true),
        onError: (error) => toaster.create({
            description: error.response.data.message,
            type: "error",

        })
    });

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        data.price = Number(data.price);
        data.stock = Number(data.stock);

        createProduct(data);
    }

    const backToList = () => {
        navigate('../products')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <FormCard
                title="Create Product"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={backToList}
                isLoadingSubmit={isPending}
            >
                <ProductForm />
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </FormCard>
        </>
    )
}

export default CreateProduct