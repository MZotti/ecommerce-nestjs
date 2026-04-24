import CardContainer from "@/components/CardContainer";
import TextDisplay from "@/components/TextDisplay";
import { useLazyGetUser } from "@/hooks/user";
import type { State } from "@/state/reducers";
import { Card, Container, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewUser = () => {
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
        <CardContainer title="User">
            <VStack gap={4}>
                <TextDisplay label="Name" value={user?.name} />
                <TextDisplay label="E-mail" value={user?.email} />
                <TextDisplay label="Role" value={user?.role.name} />
            </VStack>
        </CardContainer>
    )
}

export default ViewUser