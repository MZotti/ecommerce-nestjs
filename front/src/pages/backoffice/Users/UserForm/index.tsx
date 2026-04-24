import FormContainer from '@/components/Form/FormContainer'
import SelectInput from '@/components/Inputs/SelectInput'
import TextInput from '@/components/Inputs/TextInput'
import { useCreateUser, useUpdateUser } from '@/hooks/user'
import { Button } from '@chakra-ui/react'
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { useParams } from 'react-router-dom'

interface Props {
    update?: boolean,
    isLoading?: boolean,
    defaultValues?: FormData
}

interface FormData {
    name: string
    email: string
    roleId: number
}

const formInitialState: FormData = {
    name: "",
    email: "",
    roleId: 1,
}

const UserForm = ({ update = false, isLoading = false, defaultValues }: Props) => {
    const { id } = useParams();

    const { mutateAsync: createUser, isPending: isPendingCreate } = useCreateUser();
    const { mutateAsync: updateUser, isPending: isPendingUpdate } = useUpdateUser();
    const isPending = isPendingCreate || isPendingUpdate;

    const methods = useForm<FormData>({
        defaultValues: defaultValues || formInitialState
    })
    const {
        handleSubmit,
    } = methods;

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!update) {
            createUser(data)
        } else {
            updateUser({ id: Number(id), formData: data });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
                <FormProvider {...methods}>
                    <TextInput id='name' label='Name' />
                    <TextInput id='email' label='E-mail' />
                    <SelectInput id='roleId' label='Role' options={[
                        { value: 1, label: 'ADMIN' },
                        { value: 2, label: 'MANAGER' },
                        { value: 3, label: 'OPERATIONAL' },
                        { value: 4, label: 'ANALYST' },
                    ]} />
                    <Button w="full" type='submit' colorPalette="green" disabled={isPending} >{!update ? 'Register' : 'Update'}</Button>
                </FormProvider>
            </FormContainer >
        </form>
    )
}

export default UserForm