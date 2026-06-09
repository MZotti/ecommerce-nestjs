import { useCustomerLoginContext } from '@/contexts/CustomerLoginContext'
import { storeAccessToken } from '@/functions/auth'
import { login } from '@/services/auth'
import { authCreator } from '@/state'
import { Button, Dialog, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

interface LoginFormData {
    email: string
    password: string
}

const Login = () => {
    const { setIsOpen } = useCustomerLoginContext()
    const [credentialsError, setCredentialsError] = useState<string>("");

    const {
        register,
        handleSubmit
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

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
                    <VStack>
                        <Input placeholder='E-mail' {...register('email')} />
                        <Input placeholder='Password' {...register('password')} />
                        <Text fontSize="sm" color="red.500">{credentialsError}</Text>
                        <Button w="full" type='submit' colorPalette="orange">Login</Button>
                    </VStack>
                </form>
            </Dialog.Body>
        </Dialog.Content>
    )
}

export default Login