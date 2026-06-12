import UserForm from "../UserForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateUser } from "@/hooks/backoffice/users"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import type UserFormData from "../UserForm/UserFormData"
import FormCard from "@/components/FormCard"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../UserForm/schema"
import { toaster } from "@/components/chakra-ui/toaster"

const formInitialState: UserFormData = {
    name: "",
    email: "",
    roleId: 0,
}

const CreateUser = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const methods = useForm<UserFormData>({
        defaultValues: formInitialState,
        resolver: yupResolver(schema)
    })

    const { handleSubmit } = methods

    const { mutate: createUser, isPending } = useCreateUser({
        onSuccess: () => setModalOpen(true),
        onError: (error) => toaster.create({
            description: error.response.data.message,
            type: "error",

        })
    });

    const onSubmit: SubmitHandler<UserFormData> = async (data) => createUser(data)

    const backToList = () => {
        navigate('../users')
    }

    return (
        <>
            <FormCard
                title="Create User"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={backToList}
                isLoadingSubmit={isPending}
            >
                <UserForm />
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </FormCard>
        </>
    )
}

export default CreateUser