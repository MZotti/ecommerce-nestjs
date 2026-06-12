import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import UserForm from "../UserForm"
import { useNavigate, useParams } from "react-router-dom"
import { useGetUser, useUpdateUser } from "@/hooks/backoffice/users"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import Modal from "./Modal"
import type UserFormData from "../UserForm/UserFormData"
import FormCard from "@/components/FormCard"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../UserForm/schema"
import { toaster } from "@/components/chakra-ui/toaster"

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const users = useSelector(({ users }: State) => users)
    const storedUser = users.find(user => user.id == Number(id)) || null;
    const { data, isFetching } = useGetUser(Number(id), storedUser);

    const user = storedUser || data;

    const methods = useForm<UserFormData>({
        values: {
            name: user?.name,
            email: user?.email,
            roleId: user?.role.id
        },
        defaultValues: user,
        resolver: yupResolver(schema)
    })

    const { handleSubmit } = methods;

    const { mutateAsync: updateUser, isPending } = useUpdateUser({
        onSuccess: () => setModalOpen(true),
        onError: (error) => toaster.create({
            description: error.response.data.message,
            type: "error",

        })
    });

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