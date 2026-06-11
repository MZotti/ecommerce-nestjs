import FormContainer from '@/components/Form/FormContainer'
import PasswordInput from '@/components/Inputs/PasswordInput'
import TextInput from '@/components/Inputs/TextInput'
import { storeAccessToken } from '@/functions/auth'
import { useLogin } from '@/hooks/auth'
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

interface FormData {
    email: string
    password: string
}

const formInitialState: FormData = {
    email: "",
    password: ""
}

const Form = () => {
    const navigate = useNavigate();
    const { mutateAsync: login, isPending } = useLogin();

    const methods = useForm<FormData>({
        defaultValues: formInitialState
    })

    const { handleSubmit } = methods

    const [credentialsError, setCredentialsError] = useState<string>("");

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setCredentialsError("");
        const response = await login(data);

        if (!response) {
            setCredentialsError("Invalid credentials");
            return;
        }

        storeAccessToken(response.access_token);

        navigate("../backoffice")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer
                methods={methods}
                columns={1}
                isLoadingSubmit={isPending}
            >
                <TextInput id="email" label="E-mail" />
                <PasswordInput id="password" label="Password" />
                <Text fontSize="sm" color="red.500">{credentialsError}</Text>
                <Button colorPalette="green" type="submit">Login</Button>
                <Text>Forgot password</Text>
            </FormContainer>
        </form>
    )
}

export default Form