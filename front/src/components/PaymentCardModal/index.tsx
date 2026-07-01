import { LightMode } from '@/components/chakra-ui/color-mode'
import FormContainer from '@/components/Form/FormContainer'
import TextInput from '@/components/Inputs/TextInput'
import { Button, CloseButton, Dialog, HStack, Portal } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreatePaymentCard } from '@/hooks/store/paymentCards'
import creditCardType from 'credit-card-type';
import CardNumberInput from '@/components/Inputs/CardNumberInputs'
import NumberInput from '@/components/Inputs/NumberInput'
import SelectInput from '@/components/Inputs/SelectInput'
import { schema } from './schema'

interface AddressFormData {
    cardNumber: string
    holderName: string
    cvv: string
    expiresMonth: string
    expiresYear: string
    type: string
}

const formInitialState: AddressFormData = {
    cardNumber: "",
    holderName: "",
    cvv: "",
    expiresMonth: "",
    expiresYear: "",
    type: "CREDIT_CARD"

}

const PaymentCardModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { mutate: createPaymentCard, isPending } = useCreatePaymentCard({
        onSuccess: () => {
            reset();
            onClose();
        },
        onError: () => {
            console.log("ERROR")
        }
    });

    const methods = useForm<AddressFormData>({
        defaultValues: formInitialState,
        resolver: yupResolver(schema)
    })

    const { reset, handleSubmit } = methods;

    const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
        const card = creditCardType(data.cardNumber)[0];


        const formData = {
            ...data,
            expiresMonth: Number(data.expiresMonth),
            expiresYear: Number(data.expiresYear),
            brand: card.type
        }

        createPaymentCard(formData)
    }

    return (
        <Dialog.Root placement="center" open={isOpen} size="sm">
            <Portal>
                <LightMode>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create New Payment Card</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormContainer
                                        methods={methods}
                                        columns={2}
                                        isLoadingSubmit={isPending}
                                    >
                                        <CardNumberInput id='cardNumber' label='Card Number' colSpan={2} required />
                                        <TextInput id='holderName' label='Holder Name' colSpan={2} required />
                                        <SelectInput id='type' label='Type' options={[
                                            { label: "Credit Card", value: "CREDIT_CARD" },
                                            { label: "Debit Card", value: "DEBIT_CARD" },
                                        ]} required />
                                        <NumberInput id='cvv' label='CVV' required />
                                        <NumberInput id='expiresMonth' label='Expires Month' required />
                                        <NumberInput id='expiresYear' label='Expires Year' required />
                                    </FormContainer>
                                    <HStack justifyContent="end">
                                        <Button colorPalette="green" type="submit" disabled={isPending} loading={isPending}>Register</Button>
                                    </HStack>
                                </form>
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" onClick={onClose} disabled={isPending} />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </LightMode>
            </Portal>
        </Dialog.Root>
    )
}

export default PaymentCardModal