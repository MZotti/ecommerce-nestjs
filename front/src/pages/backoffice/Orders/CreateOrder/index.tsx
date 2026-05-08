import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import OrderForm from "../OrderForm"
import type OrderFormData from "../OrderForm/OrderFormData"
import { useCreateOrder } from "@/hooks/orders"

const formInitialState: OrderFormData = {
    userId: 1
}

const CreateOrder = () => {
    const navigate = useNavigate();

    const methods = useForm<OrderFormData>({
        defaultValues: formInitialState
    })

    const { mutateAsync: createOrder, isPending } = useCreateOrder();

    const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
        const orderData = {
            userId: 1,
            items: [
                {
                    productId: 1,
                    quantity: 2
                }
            ]
        }

        await createOrder(orderData)

        setModalOpen(true);
    }

    const backToList = () => {
        navigate('../orders')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <FormContainer
                title="Create Order"
                submitLabel="Create"
                methods={methods}
                isLoadingSubmit={isPending}
                onSubmit={onSubmit}
                onCancel={backToList}
            >
                <OrderForm />
            </FormContainer>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default CreateOrder