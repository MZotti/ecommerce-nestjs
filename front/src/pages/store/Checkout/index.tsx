import { toaster } from '@/components/chakra-ui/toaster';
import OrderResume from '@/components/OrderResume'
import SimpleCard from '@/components/SimpleCard'
import { useCreateOrder } from '@/hooks/store/orders';
import type { OrderItem } from '@/interfaces/order';
import { cartCreator } from '@/state';
import type { State } from '@/state/reducers';
import { Button, Flex, VStack } from '@chakra-ui/react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { bindActionCreators } from 'redux';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';
import CheckoutAddress from './CheckoutAddress';
import { schema } from './checkoutSchema';

interface CheckoutFormData {
    items?: OrderItem[]
    paymentMethod: string
    shippingZipCode: string
    shippingStreet: string
    shippingNumber: string
    shippingComplement: string
    shippingNeighborhood?: string
    shippingCity: string
    shippingState: string
    shippingCountry: string
}

const formInitialState: CheckoutFormData = {
    paymentMethod: "",
    shippingCity: "",
    shippingCountry: "",
    shippingNeighborhood: "",
    shippingNumber: "",
    shippingState: "",
    shippingStreet: "",
    shippingZipCode: "",
    shippingComplement: ""
}

const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector(({ cart }: State) => cart)
    const auth = useSelector(({ auth }: State) => auth)

    const dispatch = useDispatch()
    const { clearCartAction } = bindActionCreators(cartCreator, dispatch)

    const methods = useForm<CheckoutFormData>({
        defaultValues: formInitialState,
        resolver: yupResolver(schema)
    })

    const {
        handleSubmit,
        reset,
        formState: { errors }
    } = methods

    console.log("errors", errors);

    const { mutateAsync: createOrder, isPending } = useCreateOrder();

    const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
        console.log("entrou submit");

        if (!auth.user) {
            toaster.create({
                description: "Login first",
                type: "warning",
            })
            return;
        }

        if (cart.length === 0) {
            toaster.create({
                description: "Cart is empty",
                type: "warning",
            })
            return;
        }

        data.items = cart;

        const response = await createOrder(data);

        if (!response) {
            toaster.create({
                description: "Error",
                type: "error",
            })
            return;
        }

        toaster.create({
            description: "Order created",
            type: "success",
        })

        reset();
        clearCartAction();
        navigate("/")
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex w="full" px="400px" gap={2}>
                    <Flex flexGrow={2}>
                        <SimpleCard title='Finish order'>
                            <VStack gap={6} alignItems="start">
                                <CheckoutPaymentMethod />
                                <CheckoutAddress />
                            </VStack>
                        </SimpleCard>
                    </Flex>
                    <OrderResume actionButton={<Button w="full" type='submit' colorPalette="orange" disabled={isPending} loading={isPending}>Finish</Button>} />
                </Flex>
            </form>
        </FormProvider>
    )
}

export default Checkout