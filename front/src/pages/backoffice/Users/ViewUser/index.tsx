import ActiveDisplay from "@/components/ActiveDisplay";
import CardContainer from "@/components/CardContainer";
import DataDisplay from "@/components/DataDisplay";
import { FetchDataContext } from "@/contexts/FetchDataContext";
import { useGetUser } from "@/hooks/backoffice/users";
import type { State } from "@/state/reducers";
import { Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewUser = () => {
    const { id } = useParams();

    const users = useSelector(({ users }: State) => users)
    const storedUser = users.find(user => user.id == Number(id)) || null;
    const { data, isFetching } = useGetUser(Number(id), storedUser);

    const user = storedUser ?? data;

    return (
        <CardContainer title="User" >
            <FetchDataContext value={{
                data: user,
                isLoading: isFetching
            }}>
                <VStack gap={4}>
                    <DataDisplay label="Name">
                        <Text fontSize="md">{user?.name}</Text>
                    </DataDisplay>
                    <DataDisplay label="E-mail">
                        <Text fontSize="md">{user?.email}</Text>
                    </DataDisplay>
                    <DataDisplay label="Role">
                        <Text fontSize="md">{user?.role.name}</Text>
                    </DataDisplay>
                    <DataDisplay label="Is Active">
                        <ActiveDisplay isActive={user?.isActive} />
                    </DataDisplay>
                </VStack>
            </FetchDataContext>
        </CardContainer>
    )
}

export default ViewUser