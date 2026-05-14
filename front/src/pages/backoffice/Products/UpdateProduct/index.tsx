import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import ProductForm from "../ProcuctForm"
import { useLazyGetProduct, useUpdateProduct } from "@/hooks/backoffice/products"
import type ProductFormData from "../ProcuctForm/ProductFormData"

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, refetch: getProduct, isFetching } = useLazyGetProduct(Number(id));

    const products = useSelector(({ products }: State) => products)
    const storedProduct = products.find(product => product.id == Number(id)) || null;
    const product = storedProduct || data;

    const methods = useForm<ProductFormData>({
        values: {
            name: product?.name,
            categoryId: product?.category.id,
            description: product?.description,
            price: product?.price,
            stock: product?.stock
        },
        defaultValues: product
    })

    const { mutateAsync: updateUser, isPending } = useUpdateProduct();

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        await updateUser({ id: Number(id), formData: data })

        setModalOpen(true);
    }

    const backToList = () => {
        navigate('../products')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (storedProduct === null) {
            getProduct();
        }
    }, [])

    return (
        <>
            <FormContainer
                title="Update Product"
                submitLabel="Update"
                methods={methods}
                isLoading={isFetching}
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

export default UpdateProduct