import FormContainer from "@/components/Form/FormContainer";
import PasswordInput from "@/components/Inputs/PasswordInput";
import TextInput from "@/components/Inputs/TextInput";
import { useCustomerLoginContext } from "@/contexts/CustomerLoginContext";
import { register as registerCustomer } from "@/services/store/auth";
import { Button, Dialog, Input, Text, VStack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { schema } from "./registerSchema";

interface RegisterFormData {
    name: string
    email: string
    document: string
    password: string
}

const Register = () => {
    const { setDisplay } = useCustomerLoginContext()
    const [credentialsError, setCredentialsError] = useState<string>("");

    const methods = useForm<RegisterFormData>({
        defaultValues: {
            name: "",
            email: "",
            document: "",
            password: ""
        },
        resolver: yupResolver(schema)
    })

    const {
        handleSubmit
    } = methods

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
                    <FormContainer
                        methods={methods}
                        columns={1}
                        isLoadingSubmit={false}
                    >
                        <TextInput id='name' label="Name" />
                        <TextInput id="email" label="E-mail" />
                        <TextInput id="document" label="Document" />
                        <PasswordInput id="password" label="Password" />
                        <Text fontSize="sm" color="red.500">{credentialsError}</Text>
                        <Button w="full" type='submit' colorPalette="orange">Register</Button>
                    </FormContainer>
                </form>
            </Dialog.Body>
        </Dialog.Content>
    )
}

export default Register