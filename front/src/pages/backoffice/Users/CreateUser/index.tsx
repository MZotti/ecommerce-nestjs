import UserForm from "../UserForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateUser } from "@/hooks/backoffice/users"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import type UserFormData from "../UserForm/UserFormData"
import FormCard from "@/components/FormCard"

const formInitialState: UserFormData = {
    name: "",
    email: "",
    roleId: 1,
}

const CreateUser = () => {
    const navigate = useNavigate();

    const methods = useForm<UserFormData>({
        defaultValues: formInitialState
    })

    const { handleSubmit } = methods

    const { mutateAsync: createUser, isPending } = useCreateUser();

    const onSubmit: SubmitHandler<UserFormData> = async (data) => {
        await createUser(data)

        setModalOpen(true);
    }

    const backToList = () => {
        navigate('../users')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

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
            </FormCard>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default CreateUser