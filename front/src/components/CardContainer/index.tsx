import { Card, Text } from "@chakra-ui/react"

interface Props {
    title?: string
    fullW?: boolean
    fullH?: boolean
    height?: string
    margin?: string
    children: React.ReactNode
}

const CardContainer = ({ title = "", fullW = false, fullH = false, height = "auto", margin = "auto", children }: Props) => {
    return (
        <Card.Root
            m={margin}
            size="lg"
            w={fullW ? "full" : "376px"}
            h={fullH ? "full" : height}
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