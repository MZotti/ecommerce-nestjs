import { Card, Text } from "@chakra-ui/react"

interface Props {
    title: string
    children: React.ReactNode
}

const CardContainer = ({ title, children }: Props) => {
    return (
        <Card.Root m="auto" size="lg">
            <Card.Header>
                <Text fontSize="lg" fontWeight="bold">{title}</Text>
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card.Root>
    )
}

export default CardContainer