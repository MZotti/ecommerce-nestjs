import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import UserForm from "../UserForm"
import { useNavigate, useParams } from "react-router-dom"
import { useGetUser, useLazyGetUser, useUpdateUser } from "@/hooks/backoffice/users"
import { useEffect, useState } from "react"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import type UserFormData from "../UserForm/UserFormData"
import FormCard from "@/components/FormCard"

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isFetching } = useGetUser(Number(id));

    const users = useSelector(({ users }: State) => users)
    const storedUser = users.find(user => user.id == Number(id)) || null;
    const user = storedUser || data;

    const methods = useForm<UserFormData>({
        values: {
            name: user?.name,
            email: user?.email,
            roleId: user?.role.id
        },
        defaultValues: user
    })

    const { handleSubmit } = methods;

    const { mutateAsync: updateUser, isPending } = useUpdateUser();

    const onSubmit: SubmitHandler<UserFormData> = async (data) => {
        await updateUser({ id: Number(id), formData: data })

        setModalOpen(true);
    }

    const backToList = () => {
        navigate('../users')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <FormCard
                title="Update User"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={backToList}
                isLoading={isFetching}
                isLoadingSubmit={isPending}
                isUpdate
            >
                <UserForm />
            </FormCard>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default UpdateUser