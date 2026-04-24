import { Card, Text, VStack } from "@chakra-ui/react"
import ColorModeSetting from "./ColorModeSetting"
import PerPageSetting from "./PerPageSetting"

const Settings = () => {
    return (
        <Card.Root width="full" variant="outline">
            <Card.Header>
                <Card.Title>
                    <Text fontSize="md">
                        Personal Settings
                    </Text>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <VStack gap={8}>
                    <ColorModeSetting />
                    <PerPageSetting />
                </VStack>
            </Card.Body>
        </Card.Root>
    )
}

export default Settings