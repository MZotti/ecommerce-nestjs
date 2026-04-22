import FormContainer from '@/components/Form/FormContainer'
import PasswordInput from '@/components/Inputs/PasswordInput'
import TextInput from '@/components/Inputs/TextInput'
import { storeAccessToken } from '@/functions/auth'
import { useLogin } from '@/hooks/auth'
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

interface FormData {
    email: string
    password: string
}

const formInitialState: FormData = {
    email: "",
    password: ""
}

const Form = () => {
    const { mutateAsync: login, isPending } = useLogin();

    const methods = useForm<FormData>({
        defaultValues: formInitialState
    })
    const {
        handleSubmit,
    } = methods;

    const [credentialsError, setCredentialsError] = useState<string>("");

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setCredentialsError("");
        const response = await login(data);

        if (!response) {
            setCredentialsError("Invalid credentials");
            return;
        }

        storeAccessToken(response.access_token);

        // TODO: redirect
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
                <FormProvider {...methods}>
                    <TextInput id='email' label='E-mail' />
                    <PasswordInput id='password' label='Password' />
                    <Text fontSize="sm" color="red.500">{credentialsError}</Text>
                    <Button w="full" type='submit' colorPalette="green" disabled={isPending} >Entrar</Button>
                </FormProvider>
            </FormContainer >
        </form>
    )
}

export default Form