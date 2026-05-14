import UserForm from "../UserForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateUser } from "@/hooks/backoffice/users"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import type UserFormData from "../UserForm/UserFormData"

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
            <FormContainer
                title="Create User"
                submitLabel="Create"
                methods={methods}
                isLoadingSubmit={isPending}
                onSubmit={onSubmit}
                onCancel={backToList}
            >
                <UserForm />
            </FormContainer>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default CreateUser