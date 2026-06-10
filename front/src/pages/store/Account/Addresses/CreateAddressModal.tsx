import { LightMode } from '@/components/chakra-ui/color-mode'
import FormContainer from '@/components/Form/FormContainer'
import TextInput from '@/components/Inputs/TextInput'
import { useCreateAddress } from '@/hooks/store/address'
import { Button, CloseButton, Dialog, HStack, Portal } from '@chakra-ui/react'
import { useForm, type SubmitHandler } from 'react-hook-form'

interface AddressFormData {
    name: string
    zipCode: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    country: string
}

const formInitialState: AddressFormData = {
    name: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
}

const CreateAddressModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { mutateAsync: createAddress, isPending } = useCreateAddress();

    const methods = useForm<AddressFormData>({
        defaultValues: formInitialState
    })

    const { reset, handleSubmit } = methods;

    const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
        await createAddress(data)

        onClose();
        reset();
    }

    return (
        <Dialog.Root placement="center" open={isOpen} size="sm">
            <Portal>
                <LightMode>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create New Address</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormContainer
                                        methods={methods}
                                        columns={2}
                                        isLoadingSubmit={isPending}
                                    >
                                        <TextInput id='name' label='Address Name' />
                                        <TextInput id='zipCode' label='Zip Code' />
                                        <TextInput id='street' label='Street' />
                                        <TextInput id='number' label='Number' />
                                        <TextInput id='complement' label='Complement' />
                                        <TextInput id='neighborhood' label='Neighborhood' />
                                        <TextInput id='city' label='City' />
                                        <TextInput id='state' label='State' />
                                        <TextInput id='country' label='Country' />
                                    </FormContainer>
                                    <HStack justifyContent="end">
                                        <Button colorPalette="green" type="submit">Register</Button>
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

export default CreateAddressModal