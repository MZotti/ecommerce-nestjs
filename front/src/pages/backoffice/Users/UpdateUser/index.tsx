import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import UserForm from "../UserForm"
import { useNavigate, useParams } from "react-router-dom"
import { useLazyGetUser, useUpdateUser } from "@/hooks/backoffice/users"
import { useEffect, useState } from "react"
import FormContainer from "@/components/Form/FormContainer"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import type UserFormData from "../UserForm/UserFormData"

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, refetch: getUser, isFetching } = useLazyGetUser(Number(id));

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

    const { mutateAsync: updateUser, isPending } = useUpdateUser();

    const onSubmit: SubmitHandler<UserFormData> = async (data) => {
        await updateUser({ id: Number(id), formData: data })

        setModalOpen(true);
    }

    const backToList = () => {
        navigate('../users')
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (storedUser === null) {
            getUser();
        }
    }, [])

    return (
        <>
            <FormContainer
                title="Update User"
                submitLabel="Update"
                methods={methods}
                isLoading={isFetching}
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

export default UpdateUser