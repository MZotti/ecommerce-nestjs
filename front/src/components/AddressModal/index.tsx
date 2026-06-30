import { LightMode } from '@/components/chakra-ui/color-mode'
import FormContainer from '@/components/Form/FormContainer'
import TextInput from '@/components/Inputs/TextInput'
import { useCreateAddress, useUpdateAddress } from '@/hooks/store/addresses'
import { Button, CloseButton, Dialog, HStack, Portal } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { schema } from '../../pages/store/Account/Addresses/schema'
import type Address from '@/interfaces/address'
import { toaster } from '../chakra-ui/toaster'

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

const AddressModal = ({ isOpen, onClose, existingAddress }: { isOpen: boolean, onClose: () => void, existingAddress?: Address }) => {
    const { mutateAsync: createAddress, isPending: isCreating } = useCreateAddress({});
    const { mutateAsync: updateAddress, isPending: isUpdating } = useUpdateAddress(existingAddress?.id || 0, {
        onSuccess: () => {
            toaster.create({
                description: "Addresss updated",
                type: "success"
            })
        }
    });
    const isLoading = isCreating || isUpdating

    const update = existingAddress ? true : false;
    const submit = !update ? createAddress : updateAddress

    const methods = useForm<AddressFormData>({
        defaultValues: existingAddress ? {
            name: existingAddress.name,
            zipCode: existingAddress.zipCode,
            street: existingAddress.street,
            number: existingAddress.number,
            complement: existingAddress.complement,
            neighborhood: existingAddress.neighborhood,
            city: existingAddress.city,
            state: existingAddress.state,
            country: existingAddress.country,
        } : formInitialState,
        resolver: yupResolver(schema)
    })

    const { reset, handleSubmit } = methods;

    const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
        await submit(data)

        onClose();
        reset();
    }

    return (
        <Dialog.Root placement="center" open={isOpen} size="sm" lazyMount unmountOnExit>
            <Portal>
                <LightMode>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>{!update ? "Create New Address" : "Update Address"}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormContainer
                                        methods={methods}
                                        columns={2}
                                        isLoadingSubmit={isLoading}
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
                                        <Button colorPalette="green" type="submit">{!update ? "Register" : "Update"}</Button>
                                    </HStack>
                                </form>
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" onClick={onClose} disabled={isLoading} />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </LightMode>
            </Portal>
        </Dialog.Root>
    )
}

export default AddressModal