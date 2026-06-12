import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import OrderForm from "../OrderForm"
import type OrderFormData from "../OrderForm/OrderFormData"
import { useCreateOrder } from "@/hooks/backoffice/orders"
import { PaymentMethods } from "@/enums/order"
import FormCard from "@/components/FormCard"
import { toaster } from "@/components/chakra-ui/toaster"

const formInitialState: OrderFormData = {
    userId: 1,
    paymentMethod: 0,
    items: []
}

const CreateOrder = () => {
    const navigate = useNavigate();

    const methods = useForm<OrderFormData>({
        defaultValues: formInitialState
    })

    const { handleSubmit } = methods;

    const { mutate: createOrder, isPending } = useCreateOrder({
        onSuccess: () => setModalOpen(true),
        onError: (error) => toaster.create({
            description: error.response.data.message,
            type: "error",

        })
    });

    const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
        let paymentMethod = "";

        switch (data.paymentMethod) {
            case 1:
                paymentMethod = PaymentMethods.PIX;
                break;
            case 2:
                paymentMethod = PaymentMethods.PAYMENT_ORDER;
                break;
            case 3:
                paymentMethod = PaymentMethods.CREDIT;
                break;
            case 4:
                paymentMethod = PaymentMethods.DEBIT;
                break;
            default:
                paymentMethod = PaymentMethods.PIX;
                break;
        }

        const orderData = {
            userId: 1,
            paymentMethod,
            items: data.items.map(item => {
                item.quantity = Number(item.quantity);

                return item;
            })
        }

        createOrder(orderData)
    }

    const backToList = () => {
        navigate('../orders')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <FormCard
                title="Create Order"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={backToList}
                isLoadingSubmit={isPending}
            >
                <OrderForm />
            </FormCard>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default CreateOrder