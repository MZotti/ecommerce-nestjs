import { Card, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import type { State } from "@/state/reducers"
import UserForm from "../UserForm"
import { useParams } from "react-router-dom"
import { useLazyGetUser } from "@/hooks/user"
import { useEffect } from "react"

const UpdateUser = () => {
    const { id } = useParams();
    const { data, refetch: getUser, isFetching } = useLazyGetUser(Number(id));

    const users = useSelector(({ users }: State) => users)
    const storedUser = users.find(user => user.id == Number(id)) || null;
    const user = storedUser || data;

    useEffect(() => {
        if (storedUser === null) {
            getUser();
        }
    }, [])

    return (
        <Card.Root m="auto" size="lg">
            <Card.Header>
                <Text fontSize="md">Update User</Text>
            </Card.Header>
            <Card.Body>
                {
                    !isFetching &&
                    <UserForm update defaultValues={{
                        name: user?.name || '',
                        email: user?.email || '',
                        roleId: user?.role.id || 1
                    }} />
                }
            </Card.Body>
        </Card.Root>
    )
}

export default UpdateUser