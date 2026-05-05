import { Card, Text } from "@chakra-ui/react"

interface Props {
    title?: string
    full?: boolean
    margin?: string
    children: React.ReactNode
}

const CardContainer = ({ title = "", full = false, margin = "auto", children }: Props) => {
    return (
        <Card.Root
            m={margin}
            mt={0}
            size="lg"
            w={full ? "full" : "376px"}
            h={full ? "full" : "auto"}
        >
            <Card.Header hidden={title == ""}>
                <Text fontSize="lg" fontWeight="bold">{title}</Text>
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card.Root>
    )
}

export default CardContainer