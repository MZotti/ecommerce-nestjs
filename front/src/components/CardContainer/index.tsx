import { Card, Text } from "@chakra-ui/react"

interface Props {
    title?: string
    fullW?: boolean
    fullH?: boolean
    margin?: string
    children: React.ReactNode
}

const CardContainer = ({ title = "", fullW = false, fullH = false, margin = "auto", children }: Props) => {
    return (
        <Card.Root
            m={margin}
            mt={0}
            size="lg"
            w={fullW ? "full" : "376px"}
            h={fullH ? "full" : "auto"}
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