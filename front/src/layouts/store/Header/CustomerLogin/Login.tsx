import FormContainer from '@/components/Form/FormContainer'
import PasswordInput from '@/components/Inputs/PasswordInput'
import TextInput from '@/components/Inputs/TextInput'
import { useCustomerLoginContext } from '@/contexts/CustomerLoginContext'
import { storeAccessToken } from '@/functions/auth'
import { login } from '@/services/auth'
import { authCreator } from '@/state/shared'
import { Button, Dialog, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { schema } from './loginSchema'

interface LoginFormData {
    email: string
    password: string
}

const Login = () => {
    const { setIsOpen } = useCustomerLoginContext()
    const [credentialsError, setCredentialsError] = useState<string>("");

    const methods = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(schema)
    })

    const {
        handleSubmit
    } = methods

    const dispatch = useDispatch()
    const { loginAction } = bindActionCreators(authCreator, dispatch)

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setCredentialsError("");
        const response = await login(data);

        if (!response) {
            setCredentialsError("Invalid credentials");
            return;
        }

        storeAccessToken(response.access_token);

        loginAction({
            token: response.access_token,
            user: response.user
        })
        setIsOpen(false);
    }

    return (
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Login</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer
                        methods={methods}
                        columns={1}
                        isLoadingSubmit={false}
                    >
                        <TextInput id='email' label='E-mail' />
                        <PasswordInput id='password' label='Password' />
                        <Text fontSize="sm" color="red.500">{credentialsError}</Text>
                        <Button w="full" type='submit' colorPalette="orange">Login</Button>
                    </FormContainer>
                </form>
            </Dialog.Body>
        </Dialog.Content>
    )
}

export default Login