import FormContainer from '@/components/Form/FormContainer'
import PasswordInput from '@/components/Inputs/PasswordInput'
import TextInput from '@/components/Inputs/TextInput'
import { storeAccessToken } from '@/functions/auth'
import { useLogin } from '@/hooks/auth'
import { useCreateUser } from '@/hooks/user'
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

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

const Form = () => {
    const { mutateAsync: createUser, isPending } = useCreateUser();

    const methods = useForm<FormData>({
        defaultValues: formInitialState
    })
    const {
        handleSubmit,
    } = methods;

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
        data.roleId = 1;
        createUser(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
                <FormProvider {...methods}>
                    <TextInput id='name' label='Name' />
                    <TextInput id='email' label='E-mail' />
                    <Button w="full" type='submit' colorPalette="green" disabled={isPending} >Register</Button>
                </FormProvider>
            </FormContainer >
        </form>
    )
}

export default Form