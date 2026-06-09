import { useCustomerLoginContext } from "@/contexts/CustomerLoginContext";
import { register as registerCustomer } from "@/services/store/auth";
import { Button, Dialog, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface RegisterFormData {
    name: string
    email: string
    document: string
    password: string
}

const Register = () => {
    const { setDisplay } = useCustomerLoginContext()
    const [credentialsError, setCredentialsError] = useState<string>("");

    const {
        register,
        handleSubmit
    } = useForm<RegisterFormData>({
        defaultValues: {
            name: "",
            email: "",
            document: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setCredentialsError("");
        const response = await registerCustomer(data);

        if (!response) {
            setCredentialsError("Error");
            return;
        }

        setDisplay("login");
    }

    return (
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Register</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <Input placeholder='Name' {...register('name')} />
                        <Input placeholder='E-mail' {...register('email')} />
                        <Input placeholder='Document' {...register('document')} />
                        <Input placeholder='Password' {...register('password')} />
                        <Text fontSize="sm" color="red.500">{credentialsError}</Text>
                        <Button w="full" type='submit' colorPalette="orange">Register</Button>
                    </VStack>
                </form>
            </Dialog.Body>
        </Dialog.Content>
    )
}

export default Register