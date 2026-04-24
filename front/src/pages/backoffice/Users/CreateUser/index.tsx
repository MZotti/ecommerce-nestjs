import { Card, Text } from "@chakra-ui/react"
import UserForm from "../UserForm"

const CreateUser = () => {
    return (
        <Card.Root m="auto" size="lg">
            <Card.Header>
                <Text fontSize="md">Create User</Text>
            </Card.Header>
            <Card.Body >
                <UserForm />
            </Card.Body>
        </Card.Root>
    )
}

export default CreateUser