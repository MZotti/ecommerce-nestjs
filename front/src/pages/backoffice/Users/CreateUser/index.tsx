import { Card, Text } from "@chakra-ui/react"
import Form from "./Form"

const Createuser = () => {
    return (
        <Card.Root m="auto" size="lg">
            <Card.Header>
                <Text fontSize="md">Create User</Text>
            </Card.Header>
            <Card.Body >
                <Form />
            </Card.Body>
            <Card.Footer >

            </Card.Footer>
        </Card.Root>
    )
}

export default Createuser