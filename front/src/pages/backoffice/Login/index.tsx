
import { Card, Text } from "@chakra-ui/react"
import Layout from "./Layout"
import Form from "./Form"

const Login = () => {
    return (
        <Layout>
            <Card.Root w="360px">
                <Card.Header>
                    <Text mx="auto" fontWeight="bold" >Login</Text>
                </Card.Header>
                <Card.Body>
                    <Form />
                </Card.Body>
                <Card.Footer />
            </Card.Root>
        </Layout >
    )
}

export default Login